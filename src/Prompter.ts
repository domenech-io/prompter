import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

type Prompts = {
  [name:string]:string
}

export class Prompter {
	private response: string ;
  private prompts:Prompts
  constructor() {
    this.response = '';
    this.prompts = {}
	}

  addPrompt(name:string,question:string | ((...args:any)=>string)){
    if(typeof question === 'string'){
      this.prompts = {...this.prompts,[name]:question}
      return
    }
    const str =question();
    console.log('question',str)
    this.prompts = {...this.prompts,[name]:str}

  }

	async question(question: string,datatype:"BOOL" | "NUMBER" | "STRING" = "STRING"): Promise<string> {
		const rl = readline.createInterface({ input, output });
    this.response = await rl.question(question);
    rl.close()
    return this.response;
	}

  async usePrompt(name:string):Promise<string>{
    const rl = readline.createInterface({ input, output });
    const prompt = this.prompts[name];
    const response = await rl.question(prompt);
    if(!prompt){
      rl.close()
      return ''
    }
    rl.close()
    return response
  }

}
