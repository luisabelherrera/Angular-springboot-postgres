import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService, Item } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item = { name: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.itemService.getItem(id).subscribe(item => this.item = item);
    }
  }

  save(): void {
    if (this.item.id) {
      this.itemService.updateItem(this.item).subscribe(() => this.router.navigate(['/items']));
    } else {
      this.itemService.addItem(this.item).subscribe(() => this.router.navigate(['/items']));
    }
  }
}
