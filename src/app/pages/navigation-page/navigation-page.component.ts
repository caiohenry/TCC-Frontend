import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Dialog } from 'primeng/dialog';
import { ModalDialogComponent } from "../../components/modal/modal.component";
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { IAService } from '../../core/services/ia.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation-page',
  imports: [HeaderComponent, RouterModule, ButtonComponent, PageTitleComponent, ModalDialogComponent],
  templateUrl: './navigation-page.component.html',
  styleUrl: './navigation-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class NavigationPageComponent {

  importVisible: boolean = false;
  imageTest: boolean = false;
  titleImageTest: string = "";
  dataResponse: any;
  // Variable file
  cnis_client_name: string = 'Selecione um CNIS';
  cnis_client_select!: File | null;

  constructor(private $service: IAService, private http$: HttpClient){}

  // File Import Selected
  onFileSelected(event: any): void {

    // Get the file input element from the event
    const fileInput = event.target;

    // Check if files are selected
    if (fileInput.files && fileInput.files.length > 0) {

      // Retrieve the first selected file
      const file = fileInput.files[0];

      // Get the file extension in lowercase
      this.cnis_client_select = file;

    }

    // Reset the value of the file input to detect changes even if the same file is selected
    fileInput.value = '';

  }

  // Function file dropped function
  onFileDropped(files: any) {

    // Check if files are selected
    if (files && files.length > 0) {

      // Retrieve the first selected file
      const file = files[0];

      this.cnis_client_select = file;

    }
  }

  sendImageToTest() {

    // Create a new FormData object to append all form data.
    let formData = new FormData();

    formData.append(
      'image',
      this.cnis_client_select!,
        this.cnis_client_select!.name
    );

    this.importVisible = false;

  
    this.$service.postIAImage(formData).subscribe({
      next: (response) => {
        this.dataResponse = response;
        this.cnis_client_select = null;
        this.imageTest = true;
        this.titleImageTest = `A Predição do Modelo Foi: ${response.predicted_class}`
      }
    })

  }

  downloadPdf(): void {
    const pdfUrl = '/pdf/TCC.pdf';
    const pdfName = 'TCC.pdf';
    
    this.http$.get(pdfUrl, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      
      link.href = url;
      link.download = pdfName;
      link.click();
      
      window.URL.revokeObjectURL(url);
      link.remove();
    });
  }


}
