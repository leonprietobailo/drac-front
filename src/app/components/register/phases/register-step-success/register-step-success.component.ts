import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register-step-success',
  imports: [ButtonModule, FormsModule, RouterModule],
  templateUrl: './register-step-success.component.html',
  styleUrl: './register-step-success.component.scss',
})
export class RegisterStepSuccessComponent {
  @Input() accountOwner!: string;
}
