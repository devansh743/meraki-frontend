import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
    @Input() cake: any;
    currentPrice: number = 0;
    selectedWeight: string = '';

    ngOnInit() {
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

    getWhatsAppLink() {
        const phone = '919033321523';
        const message = `Hi Meraki! I'd like to order the ${this.cake.name} (${this.selectedWeight}) for ₹${this.currentPrice}.`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }

    callOwner() {
        window.location.href = 'tel:+919033321523';
    }
}