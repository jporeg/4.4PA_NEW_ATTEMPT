import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books: any = [];
 
  constructor(private crudService: CrudService) { }
 
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    });    
  }

  // Delete a book
  onDelete(id: any): any {
    this.crudService.DeleteBook(id).subscribe(res => {
      console.log(res);
      
      this.Books = this.Books.filter((book: any) => book._id !== id);
    });
  }

 
  editBook(book: any): void {
    book.isEditing = true;  
  }

  // Save the updated book details
  saveBook(book: any): void {
    this.crudService.UpdateBook(book._id, book).subscribe(res => {
      console.log(res);
      book.isEditing = false;  
    });
  }
}
