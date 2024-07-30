import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>(this.items);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      this.dataSource.data = this.items; 
      this.dataSource.paginator = this.paginator; 
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
      this.dataSource.data = this.items; 
      console.log('Deleted item with id:', id);
    });
  }
}
