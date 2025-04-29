import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  transactionMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.transactionMessage = params['message'] || 'Transaction Successful!';
    });
  }

  downloadReceipt() {
    const receiptContent = `Transaction Receipt\n\n${this.transactionMessage}\nDate: ${new Date().toLocaleString()}`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipt.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
