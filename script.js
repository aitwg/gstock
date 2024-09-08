$(document).ready(function() {
    const sheetId = '1IzMHUgFpxdFmvmfq-Ba8COb4nUCdlU5SPc_LCSFqSOg';
    const sheetName = '股票資訊';
    const encodedApiKey = 'QUl6YVN5QUV0UHhSN3pwY3FZb1gwZklGbmxYQVJYa0VlQmZBNnFF'; // Base64 編碼的 API 金鑰

    function decodeApiKey(encodedKey) {
        return atob(encodedKey);
    }

    const apiKey = decodeApiKey(encodedApiKey);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    $.getJSON(url, function(data) {
        const values = data.values;

        if (values && values.length > 1) {
            const tbody = $('#data-table tbody');
            const headers = ['地區','類別','股票代號', '股票名稱', '收盤價', '漲跌'];
            for (let i = 1; i < values.length; i++) {
                const row = values[i];
                let rowHtml = `<tr class="${i % 2 === 0 ? 'even' : 'odd'}">`;
                for (let j = 0; j < row.length; j++) {
                    rowHtml += `<td data-label="${headers[j]}">${row[j] || ''}</td>`;
                }
                rowHtml += '</tr>';
                tbody.append(rowHtml);
            }
        }
    });
});
