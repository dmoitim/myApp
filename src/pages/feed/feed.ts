import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public obj_feed = {
    usuario: 'Devair',
    data: 'November 5, 1955',
    descricao: 'Hello world IONIC!',
    qtd_likes: 12,
    qtd_comentarios: 4,
    hora_comentario: '11h ago'
  };

  public lista_filmes = new Array<any>();
  public nome_usuario: string = 'DevA';
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page: number = 1;
  public infiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider, public loadingCtrl: LoadingController) {
  }

  abrirCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fecharCarregando() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
    console.log('ionViewDidLoad FeedPage');
  }

  carregarFilmes(newPage: boolean = false) {
    this.abrirCarregando();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);

        if (!newPage) {
          this.lista_filmes = response.results;
        } else {
          this.lista_filmes = this.lista_filmes.concat(response.results);
          this.infiniteScroll.complete();
        }

        this.fecharCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);

        this.fecharCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

  doRefresh(refresher) {
    console.log('doRefresh acionado.', refresher);
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    console.log('infiniteScroll acionado.');
    this.infiniteScroll = infiniteScroll;
    this.page++;
    infiniteScroll.complete();

    this.carregarFilmes(true);
  }
}