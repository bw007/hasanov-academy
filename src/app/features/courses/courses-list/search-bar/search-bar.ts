import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.html',
    imports: [FormsModule, InputIconModule, IconFieldModule, InputTextModule],
  })
export class SearchBar {}