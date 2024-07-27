document.addEventListener('DOMContentLoaded', function start() {  // פונקציה שמבטיחה שכל הפוקנציות יפעלו רק לאחר טעינה מלאה של דף הHTML 
  
    function hideAllDivs(groupClass) {   // פונקציה להסתרת כל ה-דיבים גם במהלך השימוש בטופס 
        var divs = document.querySelectorAll(groupClass);
        if (divs) {
            divs.forEach(function (div) { div.style.display = 'none'; }); 
        }
    }

    
    function updateSubmitButtonState() { // פונקציה לעדכון מצב כפתור השליחה
        var textInput = document.getElementById('Text1').value; // הוצאת הערך שנמצא בתוך תיבת הטקסט
        var trackSelected = document.querySelector('input[name="track"]:checked'); // משתנה לשמירת הכפתור שנבחר מתוך קבוצת הכפתורים הראשונה
        var sleepSelected = document.querySelector('input[name="sleep"]:checked');//משתנה לשמירת הכפתור שנבחר מתוך קבוצת הכפתורים השניה
        var submitButton = document.getElementById('submit'); // משתנה עבור הכפתור

        if (textInput && trackSelected && sleepSelected ) { // בדיקה שיש את כל הפרמטרים להפוך את הכפתור לזמין
            submitButton.disabled = false; // אם יש אז החסימה מתבטלת 
            submitButton.style.cursor = 'pointer'; // שינוי הצורה של העכבר 
        } else {
            submitButton.disabled = true;// אם אין את כל הפרמטרים החסימה נשארת
            submitButton.style.cursor = 'not-allowed';// הגדרת הצורה של העכבר
        }
    }

   
    function generateSummary() {  // פונקציה ליצירת הודעת הסיכום
        var textInput = document.getElementById('Text1').value; // הוצאת הערך שנמצא בתוך תיבת הטקסט
        var trackSelected = document.querySelector('input[name="track"]:checked'); // משתנה לשמירת הכפתור שנבחר מתוך קבוצת הכפתורים הראשונה
        var sleepSelected = document.querySelector('input[name="sleep"]:checked'); //משתנה לשמירת הכפתור שנבחר מתוך קבוצת הכפתורים השניה
        var groupSelected = Array.from(document.querySelectorAll('input[name="group"]:checked')) // השורה יוצרת מערך מכל הצ'קבוקסים המסומנים , ובודקת אם יש לפחות אחד כזה. 
            .map(function (checkbox) { // פונקציה פנימית כדי לקבל את המידע עבור איזה כפתור נבחר
                return checkbox.nextSibling.textContent;
            }).join(', ');

        var trackText = trackSelected ? trackSelected.nextSibling.textContent : 'לא נבחר';  // משתנה לשמירת המידע המופיע בדיב שנבחר ע"י הכפתור
        var sleepText = sleepSelected ? sleepSelected.nextSibling.textContent : 'לא נבחר'; // משתנה לשמירת המידע המופיע בדיב שנבחר ע"י הכפתור

        return 'יעד הנסיעה: ' + textInput + '\n' + // יצירת ההודעה עבור המשתמש עם כל המידע שבחר והחזרתה לפונקציה שקראה לה
            'סוג מסלול: ' + trackText + '\n' +
            'לינה: ' + sleepText + '\n' +
            'הרכב מטיילים: ' + (groupSelected || 'לא נבחר');
    }

  
    function generateDetails() {  // פונקציה ליצירת פירוט מלא של הבחירות
        var details = ''; // משתנה ריק ליצירת מחרוזת 
        var trackSelected = document.querySelector('input[name="track"]:checked'); // משתנה לשמירת הכפתור שנבחר מתוך קבוצת הכפתורים הראשונה
        if (trackSelected) {  // תנאי לבדיקה אם יש כפתור לחוץ 
            var trackDiv = document.getElementById(trackSelected.value); // הוצאת הערך של דיב  שמכיל את פרטי המסלול על פי הערך של הכפתור שנבחר.
            details += '<h4>פרטי מסלול:</h4>' + (trackDiv ? trackDiv.innerHTML : 'לא נבחר') + '<br><br>'; // הוספת פרטי המסלול למחרוזת במידע וקיימים
        }

        var sleepSelected = document.querySelector('input[name="sleep"]:checked'); //משתנה לשמירת הכפתור שנבחר מתוך קבוצת הכפתורים השניה
        if (sleepSelected) { // תנאי לבדיקה אם יש כפתור לחוץ 
            var sleepDiv = document.getElementById(sleepSelected.value); // הוצאת הערך של דיב  שמכיל את פרטי המסלול על פי הערך של הכפתור שנבחר.
            details += '<h4>פרטי לינה:</h4>' + (sleepDiv ? sleepDiv.innerHTML : 'לא נבחר') + '<br><br>'; // הוספת פרטי המסלול למחרוזת במידע וקיימים
        }

        var groups = document.querySelectorAll('input[name="group"]:checked');// משתנה לשמירה כל הצ'קבוקסים שנבחרו
        if (groups.length > 0) {  // בדיקה אם יש לפחות צ'קבוקס אחד שמסומן
            details += '<h4>פרטי הרכב מטיילים:</h4>'; // הוספת כותרת  למחרוזת
            groups.forEach(function (group) { // מעבר על כל צ'קבוקס בנפרד על מנת להוציא את הערך של כל כפתור שנבחר - במידה ונבחר יותר מ1
                var groupDiv = document.getElementById(group.value); // הוצאת הערך עבור כל כפתור
                details += '<h5>' + group.nextSibling.textContent + ':</h5>' + (groupDiv ? groupDiv.innerHTML : 'לא נבחר') + '<br><br>'; // הוספת המידע עצמו למחרוזת
            });
        }

        return details; // החזרת המשתנה עם כל המידע
    }

    
    function displayModal() { // פונקציה להודעה המסכמת 
        var modal = document.getElementById('modal'); // משתנה לשמירת האלמנט של ההודעה
        var summaryText = document.getElementById('modalSummaryText'); // משתנה לשמירת הכותרת של ההודעה
        var detailsText = document.getElementById('modalDetails'); // משתנה לשמירת המידע של ההודעה

        summaryText.textContent = generateSummary(); // קריאה לפונקציה לקבל מידע
        detailsText.innerHTML = generateDetails(); // קריאה לפונקציה לקבל מידע 
        modal.style.display = 'block'; // שינוי התוצגה של ההודעה כדי שתופיע על המסך 
    }

    var modal = document.getElementById('modal'); // משתנה לשמירת ההאלמנט של ההודעה
    var closeBtn = document.querySelector('.modal .close'); // משתנה לשמירת הכפתור  שמשמש לסגירת החלון הקופץ.

    closeBtn.addEventListener('click', function close() { // פונקציה שקוראת כאשר המשתנה לוחץ על כפתור האיקס
        modal.style.display = 'none'; // השורה מעלימה את ההודעה הקופצת 
    });

    window.addEventListener('click', function  close2(event) { // פונקציה שקוראת כאשר המשתמש לוחץ בכל אזור על המסך 
        if (event.target === modal) { // תנאי לזה שהמשתמש לוחץ על ההודעה הקופצת 
            modal.style.display = 'none'; // השורה מעלימה את ההודעה הקופצת אפ התנאי מתקיים
        }
    });

    document.getElementById('submit').addEventListener('click', function submit() { // פונקציה שקוראת רק אם כפתור השליחה נלחץ
        displayModal(); // קריאה לפונקציה 
    });

    document.getElementById('Text1').addEventListener('input', function text () { // פונקציה שקוראת רק כאשר המשתמש מכניס מידע לתיבת הטקסט        
        var infoText = document.getElementById('infoText'); // משתנה לשמירת האלמנט 
        if (infoText) { // תנאי לבדיקת קיום אלמנט
            infoText.textContent = 'רשימת ציוד ל: ' + this.value; //הוספת הערך מתיבת הטקסט לאלמנט 
        }
        updateSubmitButtonState(); // קריאה לפונקציה נוספת
    });

    var trackRadioButtons = document.querySelectorAll('input[type="radio"][name="track"]'); // יצירת משתנה לשמירת כל כפתורי הרדיו בקבוצה הראשונה    
    var sleepRadioButtons = document.querySelectorAll('input[type="radio"][name="sleep"]'); // יצירת משתנה לשמירת כל כפתורי הרדיו בקבוצה השנייה
    var groupCheckboxes = document.querySelectorAll('input[type="checkbox"][name="group"]'); // יצירת משתנה לכל כפתורי הצ'קבוקס

    trackRadioButtons.forEach(function  track(radio) {  // פונקציה עבור קבוצת הכפתורים הראשונה 
        radio.addEventListener('change', function trackChange () { // הפוקנציה הפנימית קוראת רק אם אחת מהכפתורים נלחצו 
            hideAllDivs('#list > div.track'); // מסתיר את כל הדיבים עם אותם מזהה כמו הכפתורים
            var selectedDiv = document.getElementById(this.value); // מתשנה לשמירת הכפתור שנבחר
            if (selectedDiv) { // ווידוא שהכפתור אכן קיים
                selectedDiv.style.display = 'block'; // הצגת הדיב הרלוונטי לפני בחירת הכפתור
            }
            updateSubmitButtonState(); // קריאה לפונקציה נוספת 
        });
    });

    sleepRadioButtons.forEach(function sleep(radio) { // פונקציה עבור קבוצת הכפתורים השנייה 
        radio.addEventListener('change', function sleepChange() { // הפוקנציה הפנימית קוראת רק אם אחת מהכפתורים נלחצו 
            hideAllDivs('#list > div.sleep'); // מסתיר את כל הדיבים עם אותם מזהה כמו הכפתורים
            var selectedDiv = document.getElementById(this.value); // מתשנה לשמירת הכפתור שנבחר
            if (selectedDiv) { // ווידוא שהכפתור אכן קיים
                selectedDiv.style.display = 'block'; // הצגת הדיב הרלוונטי לפני בחירת הכפתור
            }
            updateSubmitButtonState(); // קריאה לפונקציה נוספת 
        });
    });

    groupCheckboxes.forEach(function group(checkbox) {  // פונקציה עבור קבוצת הכפתורים של הצ'קבוקס 
        checkbox.addEventListener('change', function groupChange() { // הפוקנציה הפנימית קוראת רק אם אחת מהכפתורים נלחצו 
            var selectedDiv = document.getElementById(this.value); // מתשנה לשמירת הכפתור שנבחר
            if (selectedDiv) { // בדיקה אם אכן קיים הכפתור
                selectedDiv.style.display = this.checked ? 'block' : 'none'; // הצגת הדיבים הרלוונטים, אם אחד מהם לא נבחר הוא לא יופיע
            }
        });
    });

    
});