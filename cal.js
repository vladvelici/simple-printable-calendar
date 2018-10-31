let Calendar = function(month, container) {
    if (month === undefined) {
        month = moment().month();
    }
    this.month = month;
    this.container = container;
    this.m = moment()
    if (month !== this.m.month()) {
        this.m.month(month);
    }
    this.m.date(1);
    this.template = document.getElementById("cal-template").innerHTML;

    this.computeWeeks = function() {
        var clone = this.m.clone();
        var month = this.m.month();

        var weeks = [];
        var currentWeek = [];

        clone.weekday(0);
        var end = this.m.clone().date(1).add(1, "month").weekday(6).add(1, "day");
        for (; clone.isBefore(end); clone.add(1, "day")) {
            currentWeek.push({
                "m": clone.clone(),
                "weekday": clone.weekday(),
                "date": clone.date(),
                "currentMonth": month == clone.month()
            });
            if (clone.weekday() === 6) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        console.log("weeks", weeks);
        return weeks;
    }.bind(this);

    this.render = function() {
        var weeks = this.computeWeeks();
        var monthName = this.m.format("MMMM YYYY");
        var rendered = Mustache.render(this.template, {"weeks": weeks, "monthName": monthName});
        this.container.innerHTML = rendered;
        document.getElementById("prevBtn").addEventListener("click", window.cal.lastMonth);
        document.getElementById("nextBtn").addEventListener("click", window.cal.nextMonth);
    }.bind(this);

    this.nextMonth = function() {
        console.log("next month");
        this.m.add(1, "month");
        this.render();
    }.bind(this);

    this.lastMonth = function() {
        console.log("last month");
        this.m.add(-1, "month");
        this.render();
    }.bind(this);
}

window.addEventListener("load", function() {
    moment.locale("en-gb");
    window.el = document.getElementById("cal-container");
    window.cal = new Calendar(undefined, window.el);
    window.cal.render();
});
