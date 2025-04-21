import { Directive, HostListener, Output, EventEmitter } from '@angular/core';


/**
 * Directive for handling drag-and-drop file functionality in Angular applications.
 */
@Directive({
    selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

    // Event emitter to notify when a file is dropped.
    @Output() fileDropped = new EventEmitter<any>();

    /**
     * Handles the 'dragover' event, preventing the default behavior and stopping propagation.
     * @param event - The drag event.
     */
    @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Handles the 'dragleave' event, preventing the default behavior and stopping propagation.
     * @param event - The drag event.
     */
    @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Handles the 'drop' event, preventing the default behavior and stopping propagation.
     * Validates the dropped file, emits an event if it's valid, and displays error messages if needed.
     * @param event - The drop event.
     */
    @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        // Check if the current drop zone contains the dropped element.
        const dropZone = event.currentTarget as HTMLElement;
        if (!dropZone.contains(event.target as Node)) {
            return; 
        }

        // Retrieve the dropped files and perform validation.
        const files = event.dataTransfer?.files;
        
        if (files && files.length == 1) {

            const file = files[0];
            const allowedExtensions = ['.xls', '.xlsx', '.csv'];
            const fileName = file.name.toLowerCase();

            // Check if the dropped file has a valid extension.
            const isExcelFile = allowedExtensions.some(extension => fileName.endsWith(extension));

            if (isExcelFile) {

                // Emit the event if the file is valid.
                this.fileDropped.emit(files);

            } else {

                // Display an error message for invalid file extensions.
                // this.messageService.add({ key: "error", severity: 'error', summary: 'Error!', detail: 'Select only files with extensions ".csv", ".xls", or ".xlsx"!', life: 3000 });

            }

        } else {

            // Display an error message for selecting more than one file.
            // this.messageService.add({ key: "error", severity: 'error', summary: 'Error!', detail: 'Select only one file at a time!', life: 3000 });
        }
    }
}