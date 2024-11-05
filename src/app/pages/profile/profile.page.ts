import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any = {
    username: this.authService.getCurrentUser(),
    firstName: '',
    lastName: '',
    birthDate: '',
    profilePicture: ''
  };
  isEditing: boolean = false;

  constructor(private authService: AuthService, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    const username = this.authService.getCurrentUser();
    if (username) {
      const profileData = await this.authService.getProfile(username);
      if (profileData) {
        this.profile = { ...profileData, username };
      } else {
        this.profile.profilePicture = 'assets/avatar-default.png';
      }
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async updateProfile() {
    if (!this.isEditing) return;

    const { username, ...profileData } = this.profile;
    await this.authService.updateProfile(username, profileData);
    this.isEditing = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profile.profilePicture = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
