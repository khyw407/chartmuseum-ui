const handleDeleteButton = async (e) => {
    let name = e.getAttribute('name');
    let version = e.getAttribute('version');
    let rtnStatus = await $.ajax({
        type: 'DELETE',
        url: `/api/charts/${name}/${version}`,
        dataType: 'json',
        timeout: 60000,
    });
    await bindDetailList();
    rtnStatus.deleted ? alert("정상적으로 삭제처리 되었습니다.") : alert("삭제중 문제가 발생하였습니다.");
};

const handleDeleteAllButton = async (e) => {
    let selectedRows = $('input.form-check-input:checked');
    if(selectedRows.length === 0) return alert("선택된 것이 없습니다.");

    let rtnStatus;
    for(let row of selectedRows) {
        let name = row.getAttribute('name');
        let version = row.getAttribute('version');
        rtnStatus = await $.ajax({
            type: 'DELETE',
            url: `/api/charts/${name}/${version}`,
            dataType: 'json',
            timeout: 60000,
        });
        
        if(!rtnStatus.deleted) break;
    }
    await bindDetailList();
    rtnStatus.deleted ? alert("정상적으로 삭제처리 되었습니다.") : alert("삭제중 문제가 발생하였습니다.");
};

const handleThCheckBox = (e) => {
    let isChecked = $(e.target).prop('checked');
    $( 'input.form-check-input' ).prop( 'checked', isChecked)
};

const bindDetailList = async () => {
    let name = $('#details').attr('name');
    let chartList = await $.ajax({
        type: 'GET',
        url: `/api/charts/${name}`,
        dataType: 'json',
        timeout: 60000,
    });

    $('#details > *').detach();
    let html = ``;
    chartList.forEach((el) => {
        let itemHtml = `
        <tr>
            <td><div class="form-check"><input class="form-check-input" type="checkbox" name=${name} version=${el.version}></div></td>
            <td>${el.version}</td>
            <td>${el.description}</td>
            <td>${el.apiVersion}</td>
            <td>${el.appVersion}</td>
            <td>${moment(el.created).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td><button type="submit" name=${name} version=${el.version} class="btn btn-info" onclick="handleDeleteButton(this)"><i class="fas fa-minus"></i> Delete</button></td>
        </tr>
        `;
        html += itemHtml;
    });

    $('#details').append(html);
};

$(async () => {
    $('#btnMultiDelete').on('click', handleDeleteAllButton);
    $('#chkAll').on('click', handleThCheckBox);
    await bindDetailList();
});
