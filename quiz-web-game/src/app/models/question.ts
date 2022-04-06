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
        this.answersToDisplay();
     }

    answersToDisplay() {
        this.tmpArr = [];
        this.incorrect_answers.forEach(item => {
            this.tmpArr.push(item);
        });
        this.tmpArr.push(this.correct_answer);
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
}