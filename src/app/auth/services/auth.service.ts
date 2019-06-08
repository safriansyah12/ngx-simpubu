// 01. INSERT KEBUTUHAN CORE MODULE
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { User } from '../models/user.model';

// 02. INSERT KEBUTUHAN FIREBASE MODULE
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// 03. DEFINISI RUANG EKSEKUSI DI APP
@Injectable({ providedIn: 'root' })


// 04. MULAI EKSPORT SERVICE KE APP
export class AuthService {
  constructor( private afAuth: AngularFireAuth, 
               private db: AngularFireDatabase,
               private firestore: AngularFirestore, 
              ) 
  { }


  // 05. LOGIN DENGAN VENDOR SOSIAL MEDIA
  socialLogin(authProvider: string) {
    let provider: any;

    if (authProvider === 'phone') {
      console.log('login with phone');
      provider = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //onSignInSubmit();
          console.log('login phone');
        }
      });
    }

    if (authProvider === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    if (authProvider === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    if (authProvider === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    return from(this.afAuth.auth.signInWithPopup(provider));
  }


  // JIKA USER BARU PERTAMA KALI LOGIN MENGGUNAKAN SOSMED - SAVE USER
  saveUser(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc('users/' + user.uid);
    user.isAdmin = false;
    user.isAdminSatker = false;
    user.isTeknisi = false;
    user.isDBU = false;
    user.isBTP = false;
    user.isBKP = false;
    user.isInspekturPeralatan = false;
    user.isInspekturPersonil = false;
    user.isInspekturSatker = false;
    user.isOnline = true;
    // set user to NOT new user (supaya tidak overwrite data diatas)
    user.isNewUser = false;
    return userRef.set(user); // tidak pake merge karena akan hilang semua data
  }



  //CHECK JIKA USER ADALAH ADMIN
  checkUserRole(uid: string) {
    return this.firestore.collection("users").doc(uid).valueChanges();
    //return this.db.object('admins/' + uid).valueChanges();
  }

  
  // FUNCTION UPDATE ONLINE STATUS - DIGUNAKAN PADA SAAT LOGIN DAN LOGOUT
  updateOnlineStatus(uid: string, status: boolean) {
    return from(this.firestore.collection("users").doc(uid).update({ isOnline: status }));
  }


  // FUNCTION LOGOUT
  logout(uid: string) {
    this.updateOnlineStatus(uid, false);
    return from(this.afAuth.auth.signOut());
  }


  // GET CURRENT USER (DIGUNAKAN PADA UPDATE PROFILE DIBAWAH)
  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }


  //UPDATE PROFILE
  updateProfile(displayName: string, photoUrl: string) {
    const userProfile = this.afAuth.auth.currentUser;
    if (userProfile) {
      return <any>from(userProfile.updateProfile( { displayName: displayName, photoURL: photoUrl }));
    }
  }


  getAuthState() {
    return this.afAuth.authState;
  }

  
}
