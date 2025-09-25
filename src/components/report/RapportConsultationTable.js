import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getConsultationReport } from "../../Redux/Action/reportConsultation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel } from "react-icons/fa"; // icône Excel
import "./RapportConsultationTable.css";

const RapportConsultationTable = () => {
  const dispatch = useDispatch();
  const consultationReport = useSelector((state) => state.consultationReport);
  const { loading, error, report } = consultationReport;

  useEffect(() => {
    dispatch(getConsultationReport());
  }, [dispatch]);

  const exportToExcel = () => {
    const data = report.map((item) => ({
      Archive: item.titre,
      Consultations: item.consultations,
      "Dernier consultant": item.dernierConsultant,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapport");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "RapportConsultation.xlsx");
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="rapport-table-container">
      <h2 className="table-title">Rapport des Consultations</h2>
      <button className="btn-export" onClick={exportToExcel}>
        <FaFileExcel style={{ marginRight: "8px" }} />
        Exporter en Excel
      </button>
      <table className="table table-hover table-modern">
        <thead className="table-header">
          <tr>
            <th>Archive</th>
            <th>Consultations</th>
            <th>Dernier consultant</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item) => (
            <tr key={item.id}>
              <td>{item.titre}</td>
              <td>{item.consultations}</td>
              <td>{item.dernierConsultant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RapportConsultationTable;
