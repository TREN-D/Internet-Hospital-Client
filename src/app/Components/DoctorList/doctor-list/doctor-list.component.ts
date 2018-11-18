import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PaginationService } from '../../../Services/pagination.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DoctorFilter } from '../../../Models/DoctorFilter';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  constructor(private service: DoctorsService, private pagService: PaginationService) { }

  private filter: DoctorFilter;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.filter = new DoctorFilter();
    this.service.getDoctors();
    this.service.getSpecializations();
  }

  onSearch($event) {
    this.filter = $event;
    this.filter.CheckIfPropertyExist();
    this.paginator.firstPage();
    const event = new PageEvent();
    event.pageSize = this.pagService.pageSize;
    event.pageIndex = this.pagService.pageIndex - 1;
    event.length = this.service.doctorsAmount;
    this.pageSwitch(event);
  }

  pageSwitch(event: PageEvent) {
    this.pagService.change(event);
    this.service.httpOptions.params = this.service.httpOptions.params.set('page', this.pagService.pageIndex.toString());
    if (this.filter.isWithParams === true) {
      this.service.getDoctors(this.filter.searchKey, + this.filter.selectedSpecialization);
    } else {
      this.service.getDoctors();
    }
    window.scroll(0, 0);
  }
}