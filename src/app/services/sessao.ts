
import { Injectable } from '@angular/core';
import { ClienteLogado } from './login-api';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  private cliente: ClienteLogado | null = null;

  salvarCliente(cliente: ClienteLogado): void {
    this.cliente = cliente;
  }

  getCliente(): ClienteLogado | null {
    return this.cliente;
  }

  getClienteId(): number | null {
    return this.cliente?.id ?? null;
  }

  sair(): void {
    this.cliente = null;
  }

}
