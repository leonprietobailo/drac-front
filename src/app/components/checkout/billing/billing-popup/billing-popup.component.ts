import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutletContext } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckoutApiService } from '../../../../services/CheckoutApiSerivce';
import { BillingInfoDto, BillingResponseStatus, RecipientDto, RecipientResponseStatus } from '../../../../dto/response/checkout';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-billing-popup',
  imports: [FormsModule, DialogModule, InputTextModule, CommonModule, FloatLabelModule, ButtonModule, ToastModule, TooltipModule],
  templateUrl: './billing-popup.component.html',
  styleUrl: './billing-popup.component.scss',
  providers: [MessageService]
})
export class BillingPopupComponent {

  @Input() display!: boolean;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() addedBilling = new EventEmitter<BillingInfoDto>();
  persisting: boolean = false;
  entityNameValue: string = "";
    emailValue: string = "";
  taxIdValue: string = "";

  constructor(private api: CheckoutApiService, private messageService: MessageService) { }

  onHide() {
    this.displayChange.emit(false);
  }

  persistRecipient() {
    this.persisting = true;
    this.api.addBillingInfo({
      id: 0,
      entityName: this.entityNameValue,
      email: this.emailValue,
      taxId: this.taxIdValue,
      starred: false
    }).subscribe({
      next: (response) => {
        this.persisting = false;
        switch (response.status) {
          case BillingResponseStatus.SUCCESS: {
            this.addedBilling.emit(response.billing);
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
