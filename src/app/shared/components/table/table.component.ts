import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SortDir, TableHeader } from '../../../core/model/table.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input({required: true}) headers: TableHeader[] = [];

  
  @Input() rows: any[] = [];
  @Input() total = 0;
  @Input() pageIndex = 1;              
  @Input() pageSize = 10;
  @Input() sortKey?: string;
  @Input() sortDir: SortDir = 'asc';
  @Input() loading = false;
  @Input() pageSizeOptions = [10, 20, 30, 50];
  @Input() trackBy: (index: number, row: any) => any = (i, r) => r?.id ?? i;

  
  @Output() sortChange = new EventEmitter<{ key?: string; dir: SortDir }>();
  @Output() pageChange = new EventEmitter<number>();         
  @Output() pageSizeChange = new EventEmitter<number>();     

  @ContentChild(TemplateRef) rowTpl!: TemplateRef<any>;      

  get totalPages() {
    return Math.max(1, Math.ceil(this.total / Math.max(1, this.pageSize)));
  }

  onHeaderClick(i: number, h: TableHeader) {
    if (!h.sortable) return;
    const nextDir: SortDir = (this.sortKey === h.key && this.sortDir === 'asc') ? 'desc' : 'asc';
    this.sortKey = h.key;
    this.sortDir = nextDir;
    this.sortChange.emit({ key: this.sortKey, dir: nextDir });
  }

  goTo(p: number) {
    const np = Math.min(Math.max(1, p), this.totalPages);
    if (np !== this.pageIndex) this.pageChange.emit(np);
  }

  onPageSize(size: number) {
    if (size !== this.pageSize) this.pageSizeChange.emit(+size);
  }
 }
