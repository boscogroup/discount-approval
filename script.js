function calculateTotalWeight(element) {
    const row = element.closest('tr');
    const qty = row.querySelector('.qty');
    const kgMtr = row.querySelector('.kgMtr');
    const totalWeight = row.querySelector('.totalWeight');

    if (qty.value && kgMtr.value) {
        totalWeight.value = (qty.value * kgMtr.value).toFixed(2);
    } else {
        totalWeight.value = '';
    }
}

function addRow() {
    const itemTable = document.getElementById('itemTable');
    const rowCount = itemTable.children.length + 1; // Increment SL No
    const newRow = `
        <tr>
            <td>${rowCount}</td>
            <td><input type="text" class="form-control itemCode" required></td>
            <td><input type="text" class="form-control itemDesc" required></td>
            <td><input type="number" class="form-control length"></td>
            <td><input type="text" class="form-control unit"></td>
            <td><input type="number" class="form-control qty" onchange="calculateTotalWeight(this)"></td>
            <td><input type="number" class="form-control kgMtr" onchange="calculateTotalWeight(this)"></td>
            <td><input type="number" class="form-control kgBar"></td>
            <td><input type="number" class="form-control totalWeight" readonly></td>
            <td><input type="number" class="form-control sellingPrice"></td>
            <td><input type="number" class="form-control requestedPrice"></td>
        </tr>
    `;
    itemTable.insertAdjacentHTML('beforeend', newRow);
}

function submitStage1() {
    const stage1Data = {
        requestedBy: document.getElementById('requestedBy').value,
        preparedBy: document.getElementById('preparedBy').value,
        creditCustomer: document.getElementById('creditCustomer').value,
        branch: document.getElementById('branch').value,
        customer: document.getElementById('customer').value,
        date: document.getElementById('date').value,
        refNo: document.getElementById('refNo').value,
        items: []
    };

    // Collect all item details
    document.querySelectorAll('#itemTable tr').forEach(row => {
        const item = {
            itemCode: row.querySelector('.itemCode').value,
            itemDesc: row.querySelector('.itemDesc').value,
            length: row.querySelector('.length').value,
            unit: row.querySelector('.unit').value,
            qty: row.querySelector('.qty').value,
            kgMtr: row.querySelector('.kgMtr').value,
            kgBar: row.querySelector('.kgBar').value,
            totalWeight: row.querySelector('.totalWeight').value,
            sellingPrice: row.querySelector('.sellingPrice').value,
            requestedPrice: row.querySelector('.requestedPrice').value
        };
        stage1Data.items.push(item);
    });

    // Populate Stage 2
    populateStage2(stage1Data);
    document.getElementById('stage1').style.display = 'none';
    document.getElementById('stage2').style.display = 'block';
}

function populateStage2(stage1Data) {
    const itemTableStage2 = document.getElementById('itemTableStage2');
    itemTableStage2.innerHTML = ''; // Clear previous entries

    // Populate common data fields in Stage 2
    document.getElementById('requestedByStage2').value = stage1Data.requestedBy;
    document.getElementById('preparedByStage2').value = stage1Data.preparedBy;
    document.getElementById('creditCustomerStage2').value = stage1Data.creditCustomer;
    document.getElementById('branchStage2').value = stage1Data.branch;
    document.getElementById('customerStage2').value = stage1Data.customer;
    document.getElementById('dateStage2').value = stage1Data.date;
    document.getElementById('refNoStage2').value = stage1Data.refNo;

    stage1Data.items.forEach((item, index) => {
        const newRow = `
            <tr>
                <td>${index + 1}</td>
                <td><input type="text" class="form-control itemCode" value="${item.itemCode}" readonly></td>
                <td><input type="text" class="form-control itemDesc" value="${item.itemDesc}" readonly></td>
                <td><input type="number" class="form-control length" value="${item.length}" readonly></td>
                <td><input type="text" class="form-control unit" value="${item.unit}" readonly></td>
                <td><input type="number" class="form-control qty" value="${item.qty}" readonly></td>
                <td><input type="number" class="form-control kgMtr" value="${item.kgMtr}" readonly></td>
                <td><input type="number" class="form-control kgBar" value="${item.kgBar}" readonly></td>
                <td><input type="number" class="form-control totalWeight" value="${item.totalWeight}" readonly></td>
                <td><input type="number" class="form-control sellingPrice" value="${item.sellingPrice}" readonly></td>
                <td><input type="number" class="form-control requestedPrice" value="${item.requestedPrice}" readonly></td>
                <td><input type="number" class="form-control cost" onchange="calculateFinalValues(this)"></td>
                <td><input type="number" class="form-control gpPercent" readonly></td>
                <td><input type="number" class="form-control discountAmount" onchange="calculateFinalValues(this)"></td>
                <td><input type="number" class="form-control totalAmount" readonly></td>
            </tr>
        `;
        itemTableStage2.insertAdjacentHTML('beforeend', newRow);
    });
}

function calculateFinalValues(element) {
    const row = element.closest('tr');
    const cost = row.querySelector('.cost').value;
    const requestedPrice = row.querySelector('.requestedPrice').value;
    const discountAmount = row.querySelector('.discountAmount');
    const gpPercent = row.querySelector('.gpPercent');
    const totalAmount = row.querySelector('.totalAmount');

    // Calculate GP %
    if (requestedPrice && cost) {
        gpPercent.value = (((requestedPrice - cost) / requestedPrice) * 100).toFixed(2);
    }

    // Calculate Total Amount
    if (requestedPrice && discountAmount.value) {
        totalAmount.value = (requestedPrice - discountAmount.value).toFixed(2);
    }
}

function submitStage2() {
    const stage2Data = {
        approvedBy: document.getElementById('approvedBy').value,
        items: []
    };

    // Collect all item details for Stage 2
    document.querySelectorAll('#itemTableStage2 tr').forEach(row => {
        const item = {
            itemCode: row.querySelector('.itemCode').value,
            itemDesc: row.querySelector('.itemDesc').value,
            length: row.querySelector('.length').value,
            unit: row.querySelector('.unit').value,
            qty: row.querySelector('.qty').value,
            kgMtr: row.querySelector('.kgMtr').value,
            kgBar: row.querySelector('.kgBar').value,
            totalWeight: row.querySelector('.totalWeight').value,
            sellingPrice: row.querySelector('.sellingPrice').value,
            requestedPrice: row.querySelector('.requestedPrice').value,
            cost: row.querySelector('.cost').value,
            gpPercent: row.querySelector('.gpPercent').value,
            discountAmount: row.querySelector('.discountAmount').value,
            totalAmount: row.querySelector('.totalAmount').value,
        };
        stage2Data.items.push(item);
    });

    // Log Stage 2 data for submission (this would be replaced with an API call in real usage)
    console.log(stage2Data);
    document.getElementById('output').innerText = JSON.stringify(stage2Data, null, 2);
}
