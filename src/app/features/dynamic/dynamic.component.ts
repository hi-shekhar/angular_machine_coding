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
  imports: [MatButtonModule],
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss',
})
export class DynamicComponent {
  // 1. ViewContainerRef: The anchor point for dynamic components
  container = viewChild('container', { read: ViewContainerRef });

  // 2. TemplateRef: A reference to the content we want to project
  projectedContent = viewChild<TemplateRef<unknown>>('projectedContent');

  // 3. Keep a reference to the created component to manage its lifecycle
  private helloComponentRef?: ComponentRef<HelloComponent>;

  loadComponent() {
    // Get the references to the ViewContainer and Template
    const container = this.container();
    const template = this.projectedContent();

    if (!container || !template) {
      console.error('ViewContainerRef or TemplateRef not found.');
      return;
    }

    // 4. Destroy previous component to prevent duplicates
    container.clear();

    // 5. Create the view from the template and get the root nodes
    const projectedNodes = [template.createEmbeddedView(null).rootNodes];

    // 6. Create the component with projected content
    this.helloComponentRef = container.createComponent(HelloComponent, {
      projectableNodes: projectedNodes,
      inputs: {
        name: 'Himanshu',
      },
    });

    // 7. Subscribe to the output
    this.helloComponentRef.instance.refreshName.subscribe(() => {
      this.helloComponentRef?.setInput('name', 'Shekhar');
    });
  }
}
