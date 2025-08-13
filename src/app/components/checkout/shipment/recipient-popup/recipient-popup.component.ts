import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutletContext } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckoutApiService } from '../../../../services/CheckoutApiSerivce';
import { RecipientDto, RecipientResponseStatus } from '../../../../dto/response/checkout';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipient-popup',
  imports: [FormsModule, DialogModule, InputTextModule, CommonModule, FloatLabelModule, ButtonModule, ToastModule],
  templateUrl: './recipient-popup.component.html',
  styleUrl: './recipient-popup.component.scss',
  providers: [MessageService]
})
export class RecipientPopupComponent {

  @Input() display!: boolean;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() addedAddress = new EventEmitter<RecipientDto>();
  persisting: boolean = false;
  nameValue: string = "";
  surnameValue: string = "";
  telephoneValue: string = "";

  constructor(private api: CheckoutApiService, private messageService: MessageService) { }

  onHide() {
    this.displayChange.emit(false);
  }

  persistAddress() {
    this.persisting = true;
    this.api.addRecipient({
      id: 0,
      name: this.nameValue,
      surname: this.surnameValue,
      phone: this.telephoneValue,
      starred: false
    }).subscribe({
      next: (response) => {
        this.persisting = false;
        switch (response.status) {
          case RecipientResponseStatus.SUCCESS: {
            this.addedAddress.emit(response.recipient);
            this.display = false;
            console.log("test")
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
