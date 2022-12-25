import { AfterViewInit, Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  name = 'Angular ' + VERSION.major;
  cameraOutput: HTMLVideoElement;
  cameraPhoto: HTMLCanvasElement;
  photo: string;

  startCamera(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((output) => (this.cameraOutput.srcObject = output))
      .catch((error) => console.error(error));
  }

  takePhoto(): void {
    this.cameraPhoto
      .getContext('2d')
      .drawImage(this.cameraOutput, 0, 0, 300, 300);

    this.photo = this.cameraPhoto.toDataURL('image/jpeg');
  }

  ngAfterViewInit(): void {
    this.cameraOutput = document.querySelector('#camera');
    this.cameraPhoto = document.querySelector('#photo-taken');
  }
}
