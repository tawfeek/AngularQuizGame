export class Question {
    answerslist: string[];
    tmpArr: string[];

    constructor(
        public category: string,
        public type: string,
        public difficulty: string,
        public question: string,
        public correct_answer: string,
        public incorrect_answers: string[]
    ) {
        this.question = this.unescapeHtml(this.question);
        this.answersToDisplay();
     }

    answersToDisplay() {
        this.tmpArr = [];
        this.incorrect_answers.forEach(item => {
            this.tmpArr.push(this.unescapeHtml(item));
        });
        this.tmpArr.push(this.unescapeHtml(this.correct_answer));
        this.answerslist = this.randomArrayShuffle(this.tmpArr)

    }

    randomArrayShuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    unescapeHtml(str) {
        return str.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&deg;/g,"°")
            .replace(/&Auml;/g,"Ä")
            .replace(/&eacute;/g,"é");
      }
}