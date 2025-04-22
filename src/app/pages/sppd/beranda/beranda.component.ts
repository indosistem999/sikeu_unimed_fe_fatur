import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DashboardComponent
    ],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent implements OnInit {
    // Math object for use in template
    Math = Math;
    
    // Current date and time
    currentDate = new Date();
    formattedDate: string;
    
    // User data
    userName = 'Dr. Rudi Tabuti, S.Pd., M.E.';
    
    // Statistics
    suratTugasCount = 100;
    pegawaiCount = 100;
    satuanKerjaCount = 40;
    
    // Filter options
    selectedStartYear = '2024';
    selectedEndYear = '2025';
    selectedSatuanKerja = 'Fakultas Ilmu Budaya';
    selectedStatistikType = 'Statistik Perjalanan Tahun 2024 - 2025';
    
    // SPD and Surat Tugas data for pie chart
    spdCount = 20;
    suratTugasChartCount = 40;
    
    constructor() {
        // Format the date as displayed in the design
        this.formattedDate = this.formatDate(this.currentDate);
    }
    
    ngOnInit(): void {
        // Future implementation: Load real data from services
        this.loadDashboardData();
    }
    
    // Helper method to format date in Indonesian format
    private formatDate(date: Date): string {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}`;
    }
    
    // Method to load dashboard data (to be implemented with real data source)
    private loadDashboardData(): void {
        // This would be replaced with actual API calls
        // For now, we use static data as shown in the design
    }
    
    // Method for handling quick access links
    navigateToLink(link: string): void {
        // Implement navigation based on the clicked link
        console.log(`Navigating to: ${link}`);
    }

    // Method to generate random bar heights for the chart
    getRandomHeight(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
