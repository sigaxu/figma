document.addEventListener('DOMContentLoaded', function() {
    // 测试用例数据
    const testCasesData = [
        {
            id: 'CS202201280194952',
            name: '人类计算与数据增强测试',
            module: '人类计算与数据',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2022-01-28 20:52',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202201260111120',
            name: '人类决策模型控制增强测试',
            module: '人类决策模型控制增强模型',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2022-01-26 13:47',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202201260109189',
            name: '利益相关者接口测试5k的冗余变异性测试',
            module: '利益相关者接口5k',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2022-01-26 10:18',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202201110625477',
            name: '自适应接口模型上下环境感知内生测试',
            module: '自适应接口与模型上下环境感知内生管理器',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2022-01-11 18:07',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202112230115037',
            name: 'applet中调用封装好2通道级及模式校验',
            module: '称调applet中调用封装好2',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2021-12-23 11:07',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202112070631757',
            name: '互金接口模型新增的功能校验',
            module: '互金接口端模型新的功能',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2021-12-07 13:36',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202112060606757',
            name: '天玑T平台包的模型测试',
            module: '天玑T平台包加加',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2021-12-06 19:49',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202112060606674',
            name: '天玑T平台包Ake与Bisac枚举测试',
            module: '天玑T平台包加加',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2021-12-06 19:47',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202112060606673',
            name: '天玑T平台包枚举测试',
            module: '天玑T平台包加加',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2021-12-06 19:45',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202112060606154',
            name: '天玑T平台包acm枚举规则测试',
            module: '天玑T平台包加加',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2021-12-06 18:38',
            actions: ['查看', '编辑']
        },
        {
            id: 'CS202112010411503',
            name: '同样调用测试利益处理接口非小规则',
            module: '同样调用测试规则',
            priority: '功能测试',
            status: '-',
            result: '-',
            executor: '李老龙',
            date: '2021-12-01 15:33',
            actions: ['查看', '编辑']
        }
    ];

    // 测试用例模板数据
    const testCaseTemplates = {
        template1: {
            name: '人类计算与数据增强测试',
            module: '人类计算与数据增强',
            priority: '高',
            desc: '1. 准备测试数据\n2. 初始化计算环境\n3. 执行人类计算过程\n4. 记录计算结果\n5. 分析数据增强效果',
            expected: '1. 计算结果符合预期\n2. 数据增强后的效果提升30%以上'
        },
        template2: {
            name: '人类决策模型控制增强测试',
            module: '人类决策模型控制增强',
            priority: '中',
            desc: '1. 准备决策模型\n2. 设置控制参数\n3. 执行决策过程\n4. 分析控制增强效果',
            expected: '决策模型在控制增强后的准确率提升20%以上'
        },
        template3: {
            name: '接口测试',
            module: '利益相关者接口',
            priority: '高',
            desc: '1. 准备接口测试环境\n2. 设置测试参数\n3. 发送请求\n4. 验证响应\n5. 记录结果',
            expected: '接口返回状态码200，响应数据符合预期格式'
        },
        template4: {
            name: '功能测试',
            module: '功能性测试',
            priority: '中',
            desc: '1. 准备测试环境\n2. 设置初始状态\n3. 执行测试操作\n4. 验证功能表现\n5. 记录结果',
            expected: '功能按照需求正常工作，无异常'
        }
    };

    // 分页相关变量
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalItems = testCasesData.length;
    let filteredData = [...testCasesData];

    // 初始化表格和分页
    function initTable() {
        renderTable();
        updatePagination();
        setupEventListeners();
    }

    // 渲染表格数据
    function renderTable() {
        const tableBody = document.getElementById('test-cases-body');
        tableBody.innerHTML = '';

        // 计算当前页显示的数据范围
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
        const currentPageData = filteredData.slice(startIndex, endIndex);

        // 创建表格行
        currentPageData.forEach(testCase => {
            const row = document.createElement('tr');
            
            // 复选框列
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.id = testCase.id;
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);
            
            // 用例编号列
            const idCell = document.createElement('td');
            idCell.textContent = testCase.id;
            row.appendChild(idCell);
            
            // 用例名称列
            const nameCell = document.createElement('td');
            nameCell.textContent = testCase.name;
            row.appendChild(nameCell);
            
            // 所属模块列
            const moduleCell = document.createElement('td');
            moduleCell.textContent = testCase.module;
            row.appendChild(moduleCell);
            
            // 优先级列
            const priorityCell = document.createElement('td');
            const priorityTag = document.createElement('span');
            priorityTag.className = 'tag tag-primary';
            priorityTag.textContent = testCase.priority;
            priorityCell.appendChild(priorityTag);
            row.appendChild(priorityCell);
            
            // 执行人列
            const executorCell = document.createElement('td');
            executorCell.textContent = testCase.executor;
            row.appendChild(executorCell);
            
            // 测试状态列
            const statusCell = document.createElement('td');
            statusCell.textContent = testCase.status;
            row.appendChild(statusCell);
            
            // 执行结果列
            const resultCell = document.createElement('td');
            resultCell.textContent = testCase.result;
            row.appendChild(resultCell);
            
            // 创建日期列
            const dateCell = document.createElement('td');
            dateCell.textContent = testCase.date;
            row.appendChild(dateCell);
            
            // 操作列
            const actionsCell = document.createElement('td');
            testCase.actions.forEach(action => {
                const actionBtn = document.createElement('button');
                actionBtn.className = 'action-btn';
                actionBtn.textContent = action;
                actionBtn.dataset.id = testCase.id;
                actionBtn.dataset.action = action;
                actionsCell.appendChild(actionBtn);
            });
            row.appendChild(actionsCell);
            
            tableBody.appendChild(row);
        });
    }

    // 更新分页信息
    function updatePagination() {
        document.getElementById('total-count').textContent = filteredData.length;
        document.getElementById('current-page').textContent = currentPage;
        
        // 更新按钮状态
        document.getElementById('first-page').disabled = currentPage === 1;
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage >= Math.ceil(filteredData.length / itemsPerPage);
        document.getElementById('last-page').disabled = currentPage >= Math.ceil(filteredData.length / itemsPerPage);
    }

    // 设置事件监听器
    function setupEventListeners() {
        // 分页按钮事件
        document.getElementById('first-page').addEventListener('click', () => {
            if (currentPage !== 1) {
                currentPage = 1;
                renderTable();
                updatePagination();
            }
        });
        
        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
                updatePagination();
            }
        });
        
        document.getElementById('next-page').addEventListener('click', () => {
            if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
                currentPage++;
                renderTable();
                updatePagination();
            }
        });
        
        document.getElementById('last-page').addEventListener('click', () => {
            const lastPage = Math.ceil(filteredData.length / itemsPerPage);
            if (currentPage !== lastPage) {
                currentPage = lastPage;
                renderTable();
                updatePagination();
            }
        });
        
        // 每页条数变化
        document.getElementById('page-size').addEventListener('change', function() {
            const newPageSize = parseInt(this.value);
            if (newPageSize !== itemsPerPage) {
                itemsPerPage = newPageSize;
                currentPage = 1; // 重置到第一页
                renderTable();
                updatePagination();
            }
        });
        
        // 全选/取消全选
        document.getElementById('select-all').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#test-cases-body input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        // 搜索框事件
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase().trim();
            if (searchText) {
                filteredData = testCasesData.filter(item => 
                    item.name.toLowerCase().includes(searchText) || 
                    item.id.toLowerCase().includes(searchText) ||
                    item.module.toLowerCase().includes(searchText)
                );
            } else {
                filteredData = [...testCasesData];
            }
            currentPage = 1; // 重置到第一页
            renderTable();
            updatePagination();
        });
        
        // 操作按钮点击事件委托
        document.getElementById('test-cases-body').addEventListener('click', function(e) {
            if (e.target.classList.contains('action-btn')) {
                const id = e.target.dataset.id;
                const action = e.target.dataset.action;
                
                const testCase = testCasesData.find(item => item.id === id);
                
                if (action === '查看') {
                    alert(`查看测试用例: ${testCase.name}`);
                    // 这里可以实现查看测试用例详情的逻辑
                } else if (action === '编辑') {
                    alert(`编辑测试用例: ${testCase.name}`);
                    // 这里可以实现编辑测试用例的逻辑
                }
            }
        });
        
        // 新建用例按钮点击事件
        document.querySelector('.btn-primary').addEventListener('click', function() {
            openNewCaseModal();
        });
        
        // 模态框关闭事件
        document.querySelector('.close').addEventListener('click', closeNewCaseModal);
        document.getElementById('cancel-case').addEventListener('click', closeNewCaseModal);
        document.getElementById('close-modal').addEventListener('click', closeNewCaseModal);
        
        // 模板按钮点击事件
        document.getElementById('template-add-btn').addEventListener('click', function(e) {
            e.preventDefault();
            toggleTemplatePanel(true);
        });
        
        // 模板面板取消按钮
        document.querySelector('.cancel-btn').addEventListener('click', function() {
            toggleTemplatePanel(false);
        });
        
        // 模板面板确定按钮
        document.querySelector('.confirm-btn').addEventListener('click', function() {
            applyTemplateFromPanel();
            toggleTemplatePanel(false);
        });
        
        // 用例类型按钮点击事件
        document.querySelectorAll('.case-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
        
        // 技术栈按钮点击事件
        document.querySelectorAll('.tech-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
        
        // 保存草稿按钮点击事件
        document.getElementById('save-draft').addEventListener('click', function() {
            alert('已保存草稿');
        });
        
        // 表单提交事件
        document.getElementById('new-case-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const caseName = document.getElementById('case-name').value;
            const casePrecondition = document.getElementById('case-precondition').value;
            const caseData = document.getElementById('case-data').value;
            
            // 创建新的测试用例
            const newCase = {
                id: 'CS' + new Date().getTime().toString().substring(0, 10),
                name: caseName,
                module: '天枢业务测试',
                priority: '功能测试',
                status: '-',
                result: '-',
                executor: '李老龙',
                date: formatDate(new Date()),
                actions: ['查看', '编辑'],
                precondition: casePrecondition,
                data: caseData
            };
            
            // 添加到数据中
            testCasesData.unshift(newCase);
            filteredData = [...testCasesData];
            
            // 更新界面
            currentPage = 1;
            renderTable();
            updatePagination();
            
            // 关闭模态框
            closeNewCaseModal();
            
            // 显示成功提示
            alert('测试用例创建成功！');
        });
    }
    
    // 打开新建用例模态框
    function openNewCaseModal() {
        document.getElementById('new-case-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 默认隐藏模板面板
        toggleTemplatePanel(false);
    }
    
    // 关闭新建用例模态框
    function closeNewCaseModal() {
        document.getElementById('new-case-modal').style.display = 'none';
        document.body.style.overflow = '';
        document.getElementById('new-case-form').reset();
        
        // 重置编辑器内容
        document.querySelectorAll('.editor-content').forEach(editor => {
            editor.textContent = '请输入不少于4个字';
        });
    }
    
    // 切换模板面板显示/隐藏
    function toggleTemplatePanel(show) {
        const templatePanel = document.getElementById('template-panel');
        if (show) {
            templatePanel.style.display = 'flex';
        } else {
            templatePanel.style.display = 'none';
        }
    }
    
    // 从模板面板应用设置到表单
    function applyTemplateFromPanel() {
        // 获取模板面板中的选择
        const moduleSelect = document.getElementById('template-module-select');
        const executeSelect = document.getElementById('template-execute-select');
        const prioritySelect = document.getElementById('template-priority-select');
        
        const selectedModule = moduleSelect.options[moduleSelect.selectedIndex].text;
        const selectedExecute = executeSelect.options[executeSelect.selectedIndex].text;
        const selectedPriority = prioritySelect.options[prioritySelect.selectedIndex].text;
        
        // 获取选中的用例类型
        const selectedCaseTypes = [];
        document.querySelectorAll('.case-type-btn.active').forEach(btn => {
            selectedCaseTypes.push(btn.textContent);
        });
        
        // 获取选中的技术栈
        const selectedTechStacks = [];
        document.querySelectorAll('.tech-btn.active').forEach(btn => {
            selectedTechStacks.push(btn.textContent);
        });
        
        // 获取描述
        const description = document.querySelector('.description textarea').value;
        
        // 根据选择的模块和类型设置表单
        if (selectedModule === '天枢业务测试') {
            document.getElementById('case-name').value = '天枢业务功能测试用例';
            document.getElementById('case-precondition').value = '1. 已登录系统\n2. 已进入天枢业务模块';
            document.getElementById('case-data').value = '测试数据: 用户信息、业务数据';
        } else {
            document.getElementById('case-name').value = '未分组测试用例';
            document.getElementById('case-precondition').value = '1. 系统正常运行\n2. 测试环境已准备就绪';
            document.getElementById('case-data').value = '测试数据：标准测试集';
        }
        
        // 设置编辑器内容
        const stepEditor = document.querySelector('.step-editor .editor-content');
        const resultEditor = document.querySelector('.result-editor .editor-content');
        
        if (selectedCaseTypes.includes('功能测试')) {
            stepEditor.textContent = '1. 进入测试模块\n2. 点击功能按钮\n3. 输入测试数据\n4. 提交表单';
            resultEditor.textContent = '1. 功能正常响应\n2. 数据处理正确\n3. 界面显示符合预期';
        } else if (selectedCaseTypes.includes('回归测试')) {
            stepEditor.textContent = '1. 执行之前失败的测试用例\n2. 验证修复的功能点';
            resultEditor.textContent = '1. 之前的缺陷已被修复\n2. 没有引入新的问题';
        } else {
            stepEditor.textContent = '请输入测试步骤...';
            resultEditor.textContent = '请输入预期结果...';
        }
    }
    
    // 格式化日期
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    
    // 初始化应用
    initTable();
}); 