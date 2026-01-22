import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../Services/mail.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  email: string = '';
  loading = false;
  message = '';
  isError = false;

  constructor(private mailService: MailService) {}

  sendMail() {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.isError = true;
      this.message = 'נא להזין כתובת מייל תקינה';
      return;
    }

    this.loading = true;
    this.message = '';
    this.isError = false;

    this.mailService.sendRegistrationForm(this.email)
      .subscribe({
        next: () => {
          this.message = 'המייל נשלח בהצלחה ✔️';
          this.email = '';
          this.loading = false;
        },
        error: () => {
          this.isError = true;
          this.message = 'אירעה שגיאה בשליחת המייל';
          this.loading = false;
        }
      });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
