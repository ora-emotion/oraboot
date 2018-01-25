/*
 * customer.file.js
 * 客户文件模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, customer */


customer.file = (function () {
	var
	  configMap = {
	  	// 当前登录人信息 { uname : 'xxx', position : num }
	  	user_info : {},

	  	// 元素集合
	  	modal_ele_map : {},

      // 客户文件信息
      customer_file_data : {},

      arg_map : {}
	  },
	  stateMap = {
      $pull        : null,
      is_ele_state : false
    },
	  jqueryMap = {},

	  setJqueryMap, setCustomerFileData, getCustomerFileData, deleteFile,
    onClick,      initModule
	;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
	setJqueryMap = function () {
		var modal_ele_map = configMap.modal_ele_map;
		jqueryMap = {
			$pull : modal_ele_map.$pull
		};
	};
	// End : setJqueryMap()

	// Start : getCustomerFileData()
	// des   : 获取被点击客户的相关文件
	//
	getCustomerFileData = function (arg_map) {
    var update_time;

		$.ajax({
			type        : 'post',
			//url         : '../../json/customerFile.json',
			url         : 'findFile',
			data        : JSON.stringify({ file_id : arg_map.file_id }),
			contentType : 'application/json;charset=UTF-8',
			dataType    : 'json',
			success     : function (data) {
        // 处理上传时间数据
        update_time = data.update_time.split(' ');
        update_time = update_time[0];
        // 文件名
        $('.file_name_text').text(data.fname);

        // 上传人
        $('.upload_person').text('上传人：' + data.uname);

        // 上传时间
        $('.upload_time').text('上传时间：' + update_time);
      },
			error : function (error) {
				console.log('获取客户文件相关信息失败！');
        // End : 上传客户文件
			}
		});
	};
	// End : getCustomerFileData()

  // Start : setCustomerFileData()
  // des   : 设置被点击客户的文件 - 上传、下载或删除
  //         customer_file_data - 被点击的客户的文件信息
  //
  setCustomerFileData = function (arg_map) {
    var this_line, this_line_arr, file_id;

    this_line     = arg_map.this_line;
    this_line_arr = arg_map.this_line_arr;
    file_id       = arg_map.file_id;

    configMap.arg_map = {
      this_line : this_line,
      this_line_arr : this_line_arr,
      file_id : file_id
    };

    // Start : 下载文件
    // 当 file_id !== 0 时，用户下载客户文件
    if ( parseInt(file_id, 10) !== 0 ) {

      // 通过判断当前被点击行是否有标记，来显示或隐藏对应的下载文件功能
      if (this_line_arr[0] === 'extend') {
        $('tr.file').remove();
        this_line.removeClass('extend');
        return false;
      }

      // 移除其他 tr 的 extend 类，在当前行上添加类 extend
      else {
        // 当前被点击行做标记
        this_line.addClass('extend');

        $('tr.file').remove();
        this_line.siblings('tr').removeClass('extend');

        this_line.after(
          '<tr class="file">' +
          '<td class="file_name text-right" colspan="5">' +
            '<span class="file_name_text"></span>' +
          '</td>' +
          '<td class="upload_person text-left" colspan="2">上传人：</td>' +
          '<td class="upload_time text-left" colspan="3">上传时间：</td>' +
          '<td class="icons" colspan="3">' +
            '<span class="icon_upload hidden"></span>' +
            '<span class="icon_download clicked"></span>' +
            '<span class="icon_delete"></span>' +
          '</td>' +
          '<td></td>' +
          '</tr>'
        );
      }

    }
    // End : 下载文件

    // Start : 上传客户文件
    // 当 file_id === 0 时，用户上传客户文件
    if ( parseInt(file_id, 10) === 0 ) {

      // 通过判断当前被点击行是否有标记，来显示或隐藏对应的下载文件功能
      if (this_line_arr[0] === 'extend') {
        $('tr.file').remove();
        this_line.removeClass('extend');
        return false;
      }

      else {
        // 当前被点击的行做标记
        this_line.addClass('extend');

        $('tr.file').remove();
        this_line.siblings('tr').removeClass('extend');

        this_line.after(
            '<tr class="file">' +
            '<td colspan="14">' +
            '<form class="upload_file" action="fileUpload" method="post" enctype="multipart/form-data">' +

            '<input class="uname" type="hidden" name="uname">' +

            '<br>' +

            '<input class="cnum" type="hidden" name="cust_cnumber">' +

            '<br>' +

            '<input class="file" type="file" name="uploadfile" multiple="multiple">' +

            '<button class="btn_upload" type="button"></button>' +

            '</form>' +
            '</td>' +
            '</tr>'
        );

        document.querySelector('tr.file input[type=file]').onchange = function () {
          if (document.querySelector('tr.file input[type=file]').files.length !== 0) {
            document.querySelector('tr.file input.uname').value = configMap.user_info.uname;
            document.querySelector('tr.file input.cnum').value = document.querySelector('tr.extend .cnum').innerText;
            document.querySelector('tr.file .btn_upload').type = 'submit';
          } else {
            document.querySelector('tr.file input.uname').value = '';
            document.querySelector('tr.file input.cnum').value = '';
            document.querySelector('tr.file input[type=file]').value = '';
            document.querySelector('tr.file .btn_upload').type = 'button';
          }
        };
      }
    }
    // End : 上传客户文件

    // 获取当前被点击客户的文件信息
    getCustomerFileData(arg_map);

  };
  // End : setCustomerFileData()

  // Start : deleteFile()
  // des   : 删除客户文件请求
  //         data = { file_id : 客户编号 }
  //
  deleteFile = function (file_id) {
    $.ajax({
      type        : 'post',
      // url         : '../../json/userlist.json',
      url         : 'fileRemove',
      data        : JSON.stringify({ file_id : file_id }),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        if (data) {
          alert('成功删除文件！');
        } else {
          alert('删除客户文件失败!');
          console.log("删除失败，请检查权限");

        }
      },
      error : function (error) {
        alert('与服务器通信失败！');
      }
    });
  };
  // End : deleteFile()

  // Start : onClick()
  // des   : 点击事件处理程序
  //
	onClick = function () {
    // 删除文件的警告弹框
    var deleteFileModal = new Modal($('.ora-user-customer-delete'), {
      width       : 300,
      height      : 150,
      titleHeight : 40
    });

    jqueryMap.$pull.click(function () {
      var this_line, this_line_arr, file_id, arg_map;

      this_line     = $(this).parent().parent();
      this_line_arr = this_line[0].className.split(' ');
      file_id       = this_line.attr('file_id');

      arg_map = {
        this_line     : this_line,
        this_line_arr : this_line_arr,
        file_id       : file_id
      };

      setCustomerFileData(arg_map);

      // 下载文件
      $('.icon_download').unbind('click').click(function () {
        window.location.href = 'fileDownload?file_id=' + arg_map.file_id;
      });

      // 删除文件
      $('.icon_delete').unbind('click').click(function () {
        deleteFileModal.showModal();
      });
      // 取消删除
      $('.ora-user-customer-delete .modal-box-close').unbind('click').click(function () {
        deleteFileModal.hideModal();
      });
      $('.ora-user-customer-delete .cancel').unbind('click').click(function () {
        deleteFileModal.hideModal();
      });
      // 确认删除
      $('.ora-user-customer-delete .confirm').unbind('click').click(function () {
        deleteFile(arg_map.file_id);
        deleteFileModal.hideModal( customer.getCustomerListData('customer/zhuguan', configMap.user_info) );
        window.location.href = 'toCustomer';
      });

    });

	};
	// End : onClick()

  // Start : initModule()
  // des   : 初始化模块
  //
	initModule = function (modal_ele_map, user_info) {
	  configMap.modal_ele_map = modal_ele_map;
	  configMap.user_info = user_info;
	  setJqueryMap();
    onClick();
	};
	// End : initModule()

  // 导出公开方法
	return { initModule : initModule };
}());
