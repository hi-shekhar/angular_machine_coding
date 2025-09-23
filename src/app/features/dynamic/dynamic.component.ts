import {
  Component,
  ComponentRef,
  input,
  output,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hello',
  standalone: true,
  template: `
    <div class="hello-container">
      <p>Hello {{ name() }}</p>
      <ng-content></ng-content>
      <button mat-button="filled" (click)="refresh()">Refresh</button>
    </div>
  `,
  imports: [MatButtonModule],
  styles: [
    `
      .hello-container {
        border: 1px solid #0056b3;
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
      }
    `,
  ],
})
export class HelloComponent {
  name = input('  ');
  refreshName = output<void>();

  refresh() {
    this.refreshName.emit();
  }
}

@Component({
  selector: 'app-dynamic',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss',
})
export class DynamicComponent {
  container = viewChild('container', { read: ViewContainerRef });
  projectedContent = viewChild<TemplateRef<unknown>>('projectedContent');

  private helloComponentRef?: ComponentRef<HelloComponent>;

  loadComponent() {
    const container = this.container();
    const template = this.projectedContent();

    // Use optional chaining for safety.
    container?.clear();

    let projectedNodes: Node[][] = [];

    if (template) {
      const projectView = container?.createEmbeddedView(template);
      projectedNodes = [projectView?.rootNodes!];
    }

    if (container) {
      this.helloComponentRef = container.createComponent(HelloComponent, {
        projectableNodes: projectedNodes,
      });

      this.helloComponentRef.setInput('name', 'Himanshu');

      this.helloComponentRef.instance.refreshName.subscribe(() => {
        this.helloComponentRef?.setInput('name', 'Shekhar');
      });
    }
  }
}
