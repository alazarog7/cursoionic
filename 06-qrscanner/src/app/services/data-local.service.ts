import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File as ionFile } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(private storage:Storage, private navCtrl: NavController, private inAppBrowser:InAppBrowser, private file:ionFile,private emailComposer: EmailComposer)  { 
    this.cargarStorage()
  }

  async cargarStorage(){
    this.guardados = (await this.storage.get('registros'))||[]
  }

  async guardaRegistro(format:string, text:string){
    await this.cargarStorage();
    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    this.storage.set('registros', this.guardados);
    this.abrirRegistro(nuevoRegistro)
  }

  abrirRegistro(registro: Registro){
    this.navCtrl.navigateForward('/tabs/tab2');
    switch(registro.type){
      case 'http':
          this.inAppBrowser.create(registro.text,'_system')
        break;
      case 'geo':
        console.log(registro.text)
          this.navCtrl.navigateForward('/tabs/tab2/mapa/'+registro.text)
        break;
    }
  }

  enviarCorreo(){
    const registrosTemporales = [] 
    const titulos = 'Titulo, Formato, Creado en,Texto\n';
    
    registrosTemporales.push(titulos);
    
    this.guardados.forEach(registro=>{
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',',' ')}\n`;
      registrosTemporales.push(linea)
    })

    this.crearArchivoFisico(registrosTemporales.join(''));
  }

  crearArchivoFisico(text: string){
    this.file.checkFile(this.file.dataDirectory,'registro.csv').then(existe => {
      console.log(existe);
      return this.excribirEnArchivo(text)
    }).catch(err => {
      return this.file.createFile(this.file.dataDirectory,'registro.csv',false).then(creado =>{
        this.excribirEnArchivo(text)
      }).catch(err => {
        console.log("No se pudo crear el archivo");
      });
    })
  }

  async excribirEnArchivo(text){
      await this.file.writeExistingFile(this.file.dataDirectory,'registro.csv',text);  
      
      const archivo = this.file.dataDirectory+'registro.csv';

      let email = {
        to: 'a.lazaro.g7@gmail.com',
        attachments: [
          archivo
        ],
        subject: 'Curso Ionic',
        body: 'Esta es mi aplicacion en <strong>Ionic</strong>',
        isHtml: true
      }

      this.emailComposer.open(email);
  }
}
