import { Category } from "./category.model";
import { SelectorModel } from "./selector.model";

export interface TableHeader {
  label: string;
  key?: string;           
  sortable?: boolean;
  align?: Align;
  class?: string;
  width?: string;         
}

export interface TableState<T> {
  rows: T[];
  total: number;
  loading: boolean;
  error?: string | null;
  query: TableQuery;
  headers: TableHeader[];
  isSaving: boolean;
  form: T | null;
  isLoadingForm: boolean
  categorias: SelectorModel<Category> | null

}

export interface TableQuery {
  page: number;       
  size: number;
  nombre?: string;      
  categoria?: string;    
}

export type Align = 'left'|'center'|'right';


export type SortDir = 'asc' | 'desc';

