import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsService } from './services/posts'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  constructor(private postsService: PostsService) {}

  newPost = {
    email: '',
    password: ''
  };

  showModal = false;
  modalMessage = '';
  isError = false;

  sendPost() {
    const { email, password } = this.newPost;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password || !emailPattern.test(email)) {
      this.modalMessage = ' Error: Invalid email or missing password, please try again.';
      this.isError = true;
      this.showModal = true;
      return;
    }

    this.postsService.addPost(this.newPost).subscribe({
      next: (res: any) => {
        this.modalMessage = `📧 Email: ${email}\n🔑 Password: ${password}`;
        this.isError = false;
        this.showModal = true;
        this.newPost = { email: '', password: '' };
      },
      error: (err) => {
        console.error('API Error:', err);
        this.modalMessage = 'An error occurred during submission.';
        this.isError = true;
        this.showModal = true;
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
