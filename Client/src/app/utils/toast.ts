import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

enum TypeToast {
  SUCCESS = "Success",
  ERROR = "Error",
  WARNING = "Warning"
}

enum ToastPosition {
  TOP_RIGHT = 'toast-top-right',
  TOP_LEFT = 'toast-top-left',
  BOTTOM_RIGHT = 'toast-bottom-right',
  BOTTOM_LEFT = 'toast-bottom-left'
}

@Injectable({
  providedIn: "root"
})
export class ToastUtils {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, position: ToastPosition = ToastPosition.TOP_RIGHT): void {
    this.toastr.success(message, TypeToast.SUCCESS, {
      timeOut: 3000,
      positionClass: position,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true
    });
  }

  showError(message: string, position: ToastPosition = ToastPosition.TOP_RIGHT): void {
    this.toastr.error(message, TypeToast.ERROR, {
      timeOut: 4000,
      positionClass: position,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true
    });
  }

  showWarning(message: string, position: ToastPosition = ToastPosition.TOP_RIGHT): void {
    this.toastr.warning(message, TypeToast.WARNING, {
      timeOut: 3500,
      positionClass: position,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true
    });
  }
}
