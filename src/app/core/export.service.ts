import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  /**
   * Exportar datos a Excel
   * @param data Array de objetos a exportar
   * @param nombreArchivo Nombre del archivo Excel
   * @param nombreHoja Nombre de la hoja en el Excel
   */
  exportarExcel(data: any[], nombreArchivo: string, nombreHoja: string = 'Reporte') {
    if (!data || data.length === 0) {
      console.error('No hay datos para exportar');
      return;
    }

    // Crear worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Ajustar ancho de columnas automáticamente
    const colWidths = this.calcularAnchos(data);
    worksheet['!cols'] = colWidths;

    // Crear workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja);

    // Descargar archivo
    XLSX.writeFile(workbook, `${nombreArchivo}.xlsx`);
  }

  /**
   * Calcular ancho de columnas según el contenido
   */
  private calcularAnchos(data: any[]): any[] {
    if (!data || data.length === 0) return [];

    const firstRow = data[0];
    const keys = Object.keys(firstRow);

    return keys.map(key => {
      const maxLength = Math.max(
        key.length,
        Math.max(...data.map(row => {
          const value = row[key];
          return value ? value.toString().length : 0;
        }))
      );
      return { wch: Math.min(maxLength + 2, 50) };
    });
  }
}
