// js/common.js
// 统一管理存储、学号生成、年份等公共函数

(function() {
    // 获取当前模拟学年（用于标题和学号）
    window.getDisplayYear = function() {
        var now = new Date();
        var currentYear = now.getFullYear();
        var currentMonth = now.getMonth() + 1;
        if (currentYear <= 2027) {
            return 2027;
        } else {
            return currentMonth < 7 ? currentYear - 1 : currentYear;
        }
    };

    // 生成学号（年份后两位 + 固定后缀）
    var STUDENT_ID_SUFFIX = '0512';
    window.generateStudentID = function() {
        var year = getDisplayYear();
        var yearSuffix = year.toString().slice(-2);
        return yearSuffix + STUDENT_ID_SUFFIX;
    };

    // 存储管理器
    window.StorageManager = {
        // ----- 学生信息 -----
        getStudentName: function() {
            return localStorage.getItem('studentName') || '';
        },
        setStudentName: function(name) {
            localStorage.setItem('studentName', name);
        },
        getStudentSurname: function() {
            return localStorage.getItem('studentSurname') || '';
        },
        setStudentSurname: function(surname) {
            localStorage.setItem('studentSurname', surname);
        },
        getStudentID: function() {
            var id = localStorage.getItem('studentID');
            if (!id) {
                id = generateStudentID();
                localStorage.setItem('studentID', id);
            }
            return id;
        },
        setStudentID: function(id) {
            localStorage.setItem('studentID', id);
        },
        getStudentGender: function() {
            return localStorage.getItem('studentGender') || '保密';
        },
        setStudentGender: function(gender) {
            localStorage.setItem('studentGender', gender);
        },

        // 快捷设置
        setStudentInfo: function(name, surname, id, gender) {
            this.setStudentName(name);
            this.setStudentSurname(surname);
            this.setStudentID(id);
            this.setStudentGender(gender);
        },
        getStudentInfo: function() {
            return {
                name: this.getStudentName(),
                surname: this.getStudentSurname(),
                id: this.getStudentID(),
                gender: this.getStudentGender()
            };
        },

        // ----- 申请状态 -----
        isDormitorySubmitted: function() {
            return localStorage.getItem('dormitorySubmitted') === 'true';
        },
        setDormitorySubmitted: function(status) {
            localStorage.setItem('dormitorySubmitted', String(status));
        },
        isUniformSubmitted: function() {
            return localStorage.getItem('uniformSubmitted') === 'true';
        },
        setUniformSubmitted: function(status) {
            localStorage.setItem('uniformSubmitted', String(status));
        },

        // ----- 表单数据（用于回显） -----
        getDormitoryFormData: function() {
            var data = localStorage.getItem('dormitory_data');
            return data ? JSON.parse(data) : null;
        },
        setDormitoryFormData: function(data) {
            localStorage.setItem('dormitory_data', JSON.stringify(data));
        },
        getUniformFormData: function() {
            var data = localStorage.getItem('uniform_data');
            return data ? JSON.parse(data) : null;
        },
        setUniformFormData: function(data) {
            localStorage.setItem('uniform_data', JSON.stringify(data));
        },

        // ----- 谜题标记 -----
        getConflictTriggered: function() {
            return localStorage.getItem('conflictTriggered') === 'true';
        },
        setConflictTriggered: function(status) {
            localStorage.setItem('conflictTriggered', String(status));
        },
        getDormitoryLightTriggered: function() {
            return localStorage.getItem('dormitory_light_triggered') === 'true';
        },
        setDormitoryLightTriggered: function(status) {
            localStorage.setItem('dormitory_light_triggered', String(status));
        },
        getUniformLensTriggered: function() {
            return localStorage.getItem('uniform_lens_triggered') === 'true';
        },
        setUniformLensTriggered: function(status) {
            localStorage.setItem('uniform_lens_triggered', String(status));
        },

        // 其他杂项（如 conflictTraceCode 等）
        getConflictTraceCode: function() {
            return localStorage.getItem('conflictTraceCode') || '';
        },
        setConflictTraceCode: function(code) {
            localStorage.setItem('conflictTraceCode', code);
        },

        // ----- 清除所有数据（退出登录）-----
        clearAll: function() {
            localStorage.clear();
        }
    };
})();