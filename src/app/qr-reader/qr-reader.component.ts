import { interval } from 'rxjs/observable/interval';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { QrCodeObject } from './qr-code-object.model';
import { QrReaderService } from './qr-reader.service';
import { S3IntService } from '../sandbox/s3-int/s3-int.service';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css']
})
export class QrReaderComponent implements OnInit, AfterViewInit {

  public year: number;
  @ViewChild('studentID') studentID: ElementRef;
  public hasCameras = false;
  public hasPermission: boolean;
  public qrResultString: string;
  public qrCodeResult: QrCodeObject;
  public hasResults: boolean;
  public inputSubmitMessage: string;
  public navigator: Navigator;
  public scannerFound: boolean;

  constructor(private qrService: QrReaderService, private s3IntService: S3IntService) {
    this.year = new Date().getFullYear();
    this.qrCodeResult = new QrCodeObject();
    this.hasResults = false;
    this.inputSubmitMessage = null;
    this.scannerFound = false;
  }

    ngOnInit(): void {
      //   this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      //       this.hasCameras = true;
      //       // console.log('Devices: ', devices);
      //       this.availableDevices = devices;
      //   });
      //   this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      //       console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
      //   });
      //   this.scanner.permissionResponse.subscribe((answer: boolean) => {
      //     this.hasPermission = answer;
      //   });

    }

    // ngOnChanges(changes: SimpleChanges) {
    //   if (changes.input) {
    //     console.log(this.studentID.nativeElement.value);
    //   }
    // }

    ngAfterViewInit() {
    }

    public getUSBDevices() {
      interval(500).subscribe(x => {
        this.studentID.nativeElement.focus();
      });
      this.scannerFound = true;
      let device: any;
      let newVariable: any;
      newVariable = window.navigator;
      newVariable.usb.requestDevice( { filters: [{ vendorId: 0x2DD6 }] } )
        .then(selectedDevice => {
          device = selectedDevice;
          return device.open(); // Begin a session.
        })
        .catch(error => {
          console.log(error);
        });
    }

    public checkStudentId(event) {
      const resultString = this.studentID.nativeElement.value;
      if (resultString.indexOf('!') > -1) {
        this.handleQrCodeResult(resultString);
        this.studentID.nativeElement.value = null;
        this.studentID.nativeElement.focus();
      }
    }

    // public capture() {
    //   // const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    //   // const capture = this.canvas.nativeElement.toDataURL('image/png');
    //   // return capture;
    // }

    handleQrCodeResult(resultString: string) {
        // const imgCapture = this.capture();
        this.inputSubmitMessage = null;
        this.qrResultString = resultString.slice(0, -1);
        console.log('Result: ', this.qrResultString);
        this.qrService.processQrCode(this.qrResultString).subscribe((result: QrCodeObject) => {
          this.qrCodeResult = result;
          this.hasResults = true;
          this.playAudio(this.qrCodeResult.enabled);
          // this.s3IntService.uploadCaptureImage(environment.qrReader.s3.qrCodeCaptureBucket, imgCapture, this.qrCodeResult)
          // .subscribe();
          setTimeout(() => {
            this.hasResults = false;
            this.studentID.nativeElement.focus();
          }, 5000);
        });
    }

    // onDeviceSelectChange(selectedValue: string) {
    //     console.log('Selection changed: ', selectedValue);
    //     this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    // }

    public playAudio(enabled: boolean) {
        const audio = new Audio();
        if (enabled) {
          audio.src = '../assets/sounds/mode.wav';
        } else {
          audio.src = '../assets/sounds/computer_error.wav';
        }
        audio.load();
        audio.play();
    }

    public submitStudentId() {
      // const imgCapture = this.capture();
      this.inputSubmitMessage = null;
      const upperCase = this.studentID.nativeElement.value.toUpperCase().trim();
      if (!upperCase) {
        this.inputSubmitMessage = 'Please enter a StudentID.';
      } else {
        const d = new Date();
        d.setHours(d.getHours() - 5);
        const todaysDateId = moment(d.toISOString()).format('MM-DD-YYYY');
        const submitKey = todaysDateId + '_' + upperCase + '.png';
        this.qrService.processQrCode(submitKey).subscribe((result: QrCodeObject) => {
          if (!result) {
            this.inputSubmitMessage = 'This is an invalid StudentID.';
          } else {
            this.inputSubmitMessage = null;
            this.studentID.nativeElement.focus();
            this.studentID.nativeElement.value = null;
            this.qrCodeResult = result;
            this.hasResults = true;
            this.playAudio(this.qrCodeResult.enabled);
            // this.s3IntService.uploadCaptureImage( environment.qrReader.s3.qrCodeCaptureBucket,
            //                                           imgCapture,
            //                                           this.qrCodeResult).subscribe();
            setTimeout(() => {
              this.hasResults = false;
              this.studentID.nativeElement.focus();
            }, 5000);
          }
        });
      }

    }

}
