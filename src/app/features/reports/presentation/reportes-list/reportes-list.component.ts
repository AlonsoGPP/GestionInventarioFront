import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReporteService } from '../../infrastructure/services/reporte.service';
import { Product } from '../../../products/domain/models/product.model';
import { jsPDF } from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import dayjs from 'dayjs';
@Component({
  selector: 'app-reportes-list',
  standalone: true,
  imports: [],
  templateUrl: './reportes-list.component.html',
  styleUrl: './reportes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesListComponent {
      loading = signal(false);
      threshold = signal(5);
      products = signal<Product[]>([]);
      constructor( private readonly reportService: ReporteService) {}

      decargarRepote(tipo:string){
        if(tipo==='lowStock'){
          this.getLowStockProductsReportPdf();
        }
      }
getLowStockProductsReportPdf(){
  this.reportService.getLowStockProductsReport().subscribe({
          next: (response) => {
           const base64Pdf = response.payload;
        const byteCharacters = atob(base64Pdf);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ReporteInventarioBajo.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
            this.loading.set(false);
          },
          error: (error) => {
            console.error('Error fetching low stock products:', error);
            this.loading.set(false);
          }
        });
}
      getLowStockProductsReport(){
        this.loading.set(true);
        this.reportService.getLowStockProducts().subscribe({
          next: (response) => {
            this.products.set(response.payload);
            this.generarPDFLowStock();
            this.loading.set(false);
          },
          error: (error) => {
            console.error('Error fetching low stock products:', error);
            this.loading.set(false);
          }
        });
      }
        generarPDFLowStock() {
    const items = this.products();
    if (!items || items.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }


    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const margin = 40;

    doc.setFontSize(14);
    doc.text('Productos con Inventario Bajo', margin, 50);
    doc.setFontSize(10);
    doc.text(`fecha: ${dayjs().format('DD/MM/YYYY HH:mm')}`, margin, 66);

    const head = [['#', 'Código', 'Producto', 'Categoría', 'Precio', 'Stock']];
    const body: RowInput[] = items.map((p, i) => [
      i + 1,
      ( p.id ?? '').toString(),
      p.name ?? '',
      p.category ?? '',
      this.formatMoney(p.price),
      p.quantity?.toString() ?? '',
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 100,
      styles: { fontSize: 9, cellPadding: 4, overflow: 'linebreak' },
      headStyles: { fillColor: [76, 175, 80], textColor: 255 },
      columnStyles: {
        0: { halign: 'right', cellWidth: 28 },
        1: { cellWidth: 70 },
        2: { cellWidth: 170 },
        3: { cellWidth: 90 },
        4: { halign: 'right', cellWidth: 70 },
        5: { halign: 'right', cellWidth: 50 },
        6: { halign: 'right', cellWidth: 55 },
        7: { halign: 'center', cellWidth: 55 },
      },
      didDrawPage: (data) => {
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.getHeight();
        const pageWidth = pageSize.getWidth();
        doc.setFontSize(9);
        doc.text(`Total ítems: ${items.length}`, margin, pageHeight - 15);
        doc.text(`Página ${doc.getNumberOfPages()}`, pageWidth - margin, pageHeight - 15, { align: 'right' });
      },
    });

    doc.save(`reporte-inventario-bajo_${dayjs().format('YYYYMMDD_HHmm')}.pdf`);
  }

  private formatMoney(v: number) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(v);
  }
}
