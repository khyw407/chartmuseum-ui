const handleSearchButton = async (e) => {
    let text = $('#inputSearch').val();
    await bindChartList(text);
};

const bindChartList = async (text="") => {
    let chartList = await $.ajax({
        type: 'GET',
        url: '/api/charts',
        dataType: 'json',
        timeout: 60000,
    });

    chartList = Object.entries(chartList).map(([chartname, list]) => {
        return{
            ...list[0],
        };
    }).filter(el => el.name.includes(text));

    $('#chartList > *').detach();
    let html = `
    <div class="container-fluid">
        <div class="row">
    `;

    chartList.forEach((el, index) => {
        let itemHtml = `
        <div class="col-lg-3 col-6">
            <div class="small-box bg-info" style="opacity: 0.7;">
                <div class="inner">
                    <h5>${el.name}</h5>
                    <p>version : ${el.version}</p>
                    <p>${el.description}</p>
                    <p>created : ${moment(el.created).format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
                <div class="icon">
                    <i class="ion ion-podium"></i>
                </div>
                <a href="/detail/${el.name}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
        </div>
        `;
        html += itemHtml;
        index % 4 === 3 && (html += `</div></div><div class="container-fluid"><div class="row">`);
    });

    $('#chartList').append(html);
};

$(async () => {
    $('#btnSearch').on('click', handleSearchButton);
    await bindChartList();
});
