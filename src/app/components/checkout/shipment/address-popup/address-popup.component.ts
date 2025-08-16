import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckoutApiService } from '../../../../services/CheckoutApiSerivce';
import { AddressDto, AddressResponseStatus, RecipientDto, RecipientResponseStatus } from '../../../../dto/response/checkout';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-address-popup',
  imports: [FormsModule, DialogModule, InputTextModule, CommonModule, FloatLabelModule, ButtonModule, ToastModule],
  templateUrl: './address-popup.component.html',
  styleUrl: './address-popup.component.scss',
  providers: [MessageService]
})
export class AddressPopupComponent {

  @Input() display!: boolean;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() addedAddress = new EventEmitter<AddressDto>();
  persisting: boolean = false;
  
  cityValue: string = "";
  provinceValue: string = "";
  streetValue: string = "";
  flatValue: string = "";
  zipValue: string = "";

  constructor(private api: CheckoutApiService, private messageService: MessageService) { }

  onHide() {
    this.displayChange.emit(false);
  }

  persistAddress() {
    this.persisting = true;
    this.api.addAddress({
      id: 0,
      city: this.cityValue,
      province: this.provinceValue,
      street: this.streetValue,
      flat: this.flatValue,
      zip: this.zipValue,
      starred: false,
      type: 'AddressDto'
    }).subscribe({
      next: (response) => {
        this.persisting = false;
        switch (response.status) {
          case AddressResponseStatus.SUCCESS: {
            this.addedAddress.emit(response.address);
            this.display = false;
            break;
          }
          default: {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error inesperat', life: 3000 });
          }
        }
      }
    })
  }

}
