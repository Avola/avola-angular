import { Component } from '@angular/core';
import { AvolaService, FreeExecutionRequest, ExecutionRequestData } from 'avola-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private avola: AvolaService) {
    const request = new FreeExecutionRequest(4);
    request.Reference = 'Test from angular packge -- ' + Date.now;
    request.ExecutionRequestData = new Array(new ExecutionRequestData(6, 'hello world'));

    avola.executeDecisionFree(request).subscribe((result) => {
      if (result.HitConclusions) {
        const finalconclusion = result.HitConclusions.find(x => x.BusinessDataId === result.FinalConclusionBusinessDataIds[0]);
        alert(`The decision '${finalconclusion.DecisionTableName}' resulted in a final conclusion: ${finalconclusion.Value}`);
      }
    });
  }
}
