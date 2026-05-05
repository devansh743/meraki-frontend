import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
    @Input() cake: any;
    currentPrice: number = 0;
    selectedWeight: string = '';

    ngOnInit() {
        // Set default price and weight on load
        if (this.cake && this.cake.variants && this.cake.variants.length > 0) {
            const defaultVariant = this.cake.variants.find((v: any) => v.isDefault) || this.cake.variants[0];
            this.currentPrice = defaultVariant.price;
            this.selectedWeight = defaultVariant.weight;
        }
    }

    updateVariant(variant: any) {
        this.currentPrice = variant.price;
        this.selectedWeight = variant.weight;
    }
}