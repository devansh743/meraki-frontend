import { Component, OnInit, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CakeService } from '../../services/cake.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, AfterViewInit {
  cakes: any[] = [];
  filteredCakes: any[] = [];
  isScrolled = false;

  mainCategories: string[] = ['All', 'Cake', 'Pastry', 'Cup Cake'];
  subCategories: string[] = ['All', 'Birthday', 'Anniversary', 'New Born', 'Children Special', 'Festive Special', 'Premium'];
  
  currentMainCategory: string = 'All';
  currentSubCategory: string = 'All';
  showAll = false;

  constructor(
    private cakeService: CakeService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.cakeService.getCakes().subscribe(data => {
      this.cakes = data;
      this.applyFilters();
      setTimeout(() => this.setupScrollReveal(), 100);
    });
  }

  filterMain(category: string) {
    this.currentMainCategory = category;
    this.currentSubCategory = 'All';
    this.applyFilters();
  }

  filterSub(category: string) {
    this.currentSubCategory = category;
    this.applyFilters();
  }

  toggleMenu() {
    this.showAll = !this.showAll;
    if (this.showAll) {
      setTimeout(() => this.setupScrollReveal(), 100);
    }
  }

  private applyFilters() {
    let result = this.cakes;

    if (this.currentMainCategory !== 'All') {
      result = result.filter(cake => cake.type === this.currentMainCategory);
    }

    if (this.currentMainCategory === 'Cake' && this.currentSubCategory !== 'All') {
      result = result.filter(cake => cake.category === this.currentSubCategory);
    }

    this.filteredCakes = result;
    setTimeout(() => this.setupScrollReveal(), 100);
  }

  ngAfterViewInit() {
    this.setupScrollReveal();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  private setupScrollReveal() {
    const revealElements = this.el.nativeElement.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach((el: any) => revealOnScroll.observe(el));
  }

  scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
