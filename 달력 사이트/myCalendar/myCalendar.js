let now = new Date();
let currentDay = now.getDate();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();
const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월",
                "7월", "8월", "9월", "10월", "11월", "12월"];

let backgrounds = [
    'images/January.jpg',
    'images/February.jpg',
    'images/March.jpg',
    'images/April.jpg',
    'images/May.jpg',
    'images/June.jpg',
    'images/July.jpg',
    'images/August.jpg',
    'images/September.jpg',
    'images/October.jpg',
    'images/November.jpg',
    'images/December.jpg'
];

//월과 연도에 따라 달력 생성
function generateCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();
    let tableColor = selectTableColor(month); // 테이블 색상 선택

    let table = '<table>';
    table += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';
    for (let i = 0; i < firstDay; i++) {
        table += '<td></td>';
    }

    for (let i = 1; i <= lastDate; i++) {
        if ((i + firstDay - 1) % 7 === 0 && i !== 1) {
            table += '</tr><tr>';
        }

        if (month+1 === 12 && i === 25) {
            table += '<td class="holiday">' + i + '<br><span style = "font-size: 15px;">크리스마스</span>' + '</td>';
            } else if (month+1 === 1 && i === 1) {
                table += '<td class="holiday">' + i + '<br><span style = "font-size: 15px;">새해</span>' + '</td>';
            } else if (month+1 === 10 && i === 30){
                table += '<td class="special-day">' + i + '<br><span style = "font-size: 15px;">내 생일</span>' + '</td>';
            } else if(month + 1 === 8 && i === 15){
                table += '<td class="holiday">' + i + '<br><span style = "font-size: 15px;">광복절</span>' + '</td>';
            } 
            //else if(month + 1 === 10 && i === 9){
            //     table += '<td class="holiday">' + i + '<br><span style = "font-size: 15px;">한글날</span>' + '</td>';
            // } 
            else {
                table += '<td>' + i + '</td>';
            }
    }
    while ((lastDate + firstDay) % 7 !== 0) {
        table += '<td></td>';
        lastDate++;
    }
    table += '</tr>';

    document.querySelector('.calendar').innerHTML = table;
    document.querySelector('.month-name').textContent = year+ '년' + ' ' + monthNames[month];
}
//현재 월에 해당되는 테이블 색
function selectTableColor(month){
    let tableColor = '';//테이블 색상
    let headerColor = '';//헤더 색상
    let monthColor = ''; //현재 년달 색상
    let text = ''; //꽃 이름

 // 월에 따라 적절한 색상을 선택합니다.
 switch (month) {
    case 0: // 1월
        tableColor = 'rgba(254, 252, 254, 0.502)'; 
        headerColor = '#fd9f53c5';

        break;
    case 1: // 2월
    tableColor = 'rgba(255, 255, 255, 0.3)'; 
    headerColor = '#f6ff8d93';
    text = '수선화';
    break;

    case 2: // 3월
    tableColor = 'rgba(161, 114, 161, 0.377)'; 
    tableColor = 'rgba(254, 168, 253, 0.177)';
    text = '벚꽃';
    break;

    case 3: // 4월
    tableColor = 'rgba(246, 251, 177, 0.354)'; 
    headerColor = 'rgba(246, 255, 113, 0.231)';
    text = '개나리'
    break;

    case 4: // 5월
    tableColor = 'rgba(255, 255, 255, 0.3)'; 
    headerColor = 'rgba(253, 131, 66, 0.384)';
    text = '민들레'
    break;

    case 5: // 6월
    tableColor = 'rgba(255, 255, 255, 0.3)'; 
    headerColor = '#ff8f3289';
    text = '데이지'
    break;

    case 6: // 7월
    tableColor = 'rgba(180, 190, 140, 0.133)'; 
    headerColor = '#4688f356';
    text = '해바라기';
    break;

    case 7: // 8월
    tableColor = '#9a9a9a5b'; 
    headerColor = 'rgba(117, 173, 241, 0.384)';
    text = '갈대밭';
    break;

    case 8: // 9월
    tableColor = 'rgba(255, 255, 255, 0.3)'; 
    headerColor = 'rgba(246, 185, 255, 0.306)';
    text = '코스모스';
    break;

    case 9: // 10월
    tableColor = 'rgba(255, 215, 162, 0.274)'; 
    headerColor = 'rgba(121, 38, 11, 0.357)';
    text = '단풍나무';
    break;
    
    case 10: // 11월
    tableColor = 'rgba(255, 255, 255, 0.3)'; 
    headerColor = 'rgba(22, 142, 58, 0.445)';
    text = '겨울나무';
    break;
    
    case 11: // 12월
    tableColor = 'rgba(255, 255, 255, 0.3)'; 
    headerColor = 'rgba(198, 212, 202, 0.477)';
    text = '눈오는 갈대밭';
    break;
    }
    
    document.querySelector('table').style.backgroundColor = tableColor;

    const headerCells = document.querySelectorAll('.calendar th');
    headerCells.forEach(cell => {
        cell.style.backgroundColor = headerColor; // 헤더 색상 적용
    });

    document.querySelector('.month-name').style.color = monthColor;

    const viewText = document.querySelectorAll('.text');
    viewText.forEach(t => {
        t.textContent = text;
    })
}

//버튼의 방향에 따라 월을 변경 + 이미지 변경
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    generateCalendar(currentMonth, currentYear);
    loadCurrentMonthImage(currentMonth); // 현재 월 이미지 로드
    selectTableColor(currentMonth); // 테이블 색상 선택
}

//select로 선택된 월에 따라 월을 변경 + 이미지 변경
function changeMonthSelect(selectedMonth) {
currentMonth = parseInt(selectedMonth);
generateCalendar(currentMonth, currentYear);//코드 흐름에 따라 달력 재생성
toggleMonthSelect();//선택했을 때 옵션을 숨기기위해
loadCurrentMonthImage(currentMonth); // 현재 월 이미지 로드
selectTableColor(currentMonth); // 테이블 색상 선택
}

//월 선택 컨테이너 표시 상태를 변경(보이게하거나, 숨김)
function toggleMonthSelect() {
const monthSelectContainer = document.querySelector('.month-select-container');
monthSelectContainer.style.display = monthSelectContainer.style.display === 'block' ? 'none' : 'block';
}


// 현재 날짜와 시간을 가져와 문자열로 반환
function getCurrentDateTime() {
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');

// 형식에 맞게 날짜와 시간을 반환합니다.
return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 현재 선택된 월에 해당하는 이미지 로드
function loadCurrentMonthImage(month) {
    const monthImagePath = backgrounds[month];
    document.body.style.backgroundImage = `url('${monthImagePath}')`;
}


//달력 생성 + 현재 달 이미지 로드
generateCalendar(currentMonth, currentYear);
loadCurrentMonthImage(currentMonth);
// 현재 날짜와 시간을 표시하는 input 요소를 가져와서 설정한다.
const datetimeInput = document.querySelector('.datetime');
datetimeInput.value = getCurrentDateTime();

// 페이지가 로드될 때 select 요소가 현재 월을 선택하도록 설정
document.querySelector('.month-select').value = currentMonth;
// 페이지가 로드될 때 selectTableColor 호출하여 색상 적용
selectTableColor(currentMonth);
