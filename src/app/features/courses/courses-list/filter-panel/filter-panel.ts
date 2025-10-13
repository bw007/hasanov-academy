import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.html',
  imports: [
    CommonModule,
    FormsModule, 
    CheckboxModule, 
    RadioButtonModule, 
    RatingModule,
    SliderModule
  ]
})
export class FilterPanel {

  selectedCategories: string[] = [];
  selectedInstructors: string[] = [];
  selectedPrice: string = 'all';

  categories = [
    { name: 'Web dasturlash', count: 15 },
    { name: 'AKT savodxonligi', count: 15 },
  ];
  
  instructors = [
      { name: 'Umar Sadullayev', count: 15 },
      { name: 'Shaxzod Tursunov', count: 15 },
  ];
  
  rangeValues: number[] = [20, 80];
}