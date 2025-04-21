import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, Output, TemplateRef, output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalDialogComponent {

  @ContentChild('header', { static: false })
  headerTemplateRef!: TemplateRef<any>;

  @ContentChild('body', { static: false })
  bodyTemplateRef!: TemplateRef<any>;

  @ContentChild('options', { static: false })
  optionTemplateRef!: TemplateRef<any>;

  @Input() visible: boolean = false;
  @Input() width: string = "30%"
  @Input() closeButton: boolean = true;
  @Input() qtdOptions: number = 1;
  close= output();

  constructor(){}

  // Close modal
  closeModal() {
    this.close.emit()
  }

}