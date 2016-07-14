import {Component}                  from '@angular/core';
import {HTTP_PROVIDERS}             from '@angular/http';
import {SmoothAlert}                from "lib/components/smoothAlert/smoothalert.component";
import {Datepicker}                 from "lib/components/datepicker/datepicker";
import {JobService}                 from "lib/services/jobService";
import {Appointment}                from "lib/classes/appointment";
import {AppointmentList}            from "lib/components/appointmentlist/appointmentlist.component";

@Component({
  selector: 'home',
  template: require('pages/front/myappointments/myappointments.component.html'),
  directives: [SmoothAlert, Datepicker, AppointmentList],
  providers: [
    HTTP_PROVIDERS,
    JobService
  ],
  styles: [require('css/myappointments.component.css'), require('css/front.component.css')]
})

export class MyAppointments {
  public show:{};
  public appointments: Appointment[] = [];

  constructor(private _jobService:JobService) {
    this.show = {
      alert: false
    };

    this._jobService.getUserAppointments()
      .subscribe(success => {
        this.appointments = success;
      }, error => {
      });
  }

  public toggle(key) {
    this.show[key] = !this.show[key];
  }
}
