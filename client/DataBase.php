<?php

class db
{	

	function __construct() {
       $link = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die ("Problem connecting to DataBase");
		mysql_select_db(DB_NAME) or die('Could not select database');
		mysql_query("set names 'utf8'"); 
   }
   function __destruct() {
       $link = null;
   }
///执行一条语句，成功返回Resourceid,失败则返回false
	function query($query_item){
		/* 删除查询项首尾的空白符 */
        $query_item = trim($query_item);

        /* 如果查询项为空则返回false */
        if (!$query_item)
        {
            return false;
        }
		
		return mysql_query($query_item);        
	}
	///执行一条查询语句，成功则返回一个字段，失败则返回false
	function getOne($query_item)
    {
        $sql = trim($query_item . ' LIMIT 1');
        $res = $this->query($sql);
        if ($res !== false)
        {
            $row = mysql_fetch_row($res);

            if ($row !== false)
            {
                return $row[0];
            }
            else
            {
                return '';
            }
        }
        else
        {
            return false;
        }
    }
	///执行一条查询语句，成功则返回一行，失败则返回false
	function getRow($query_item){
		$res = $this->query($query_item);
		if($res){
			return mysql_fetch_array($res);
		}else {
			return false;
		}
	}
	///执行一条查询语句成功则返回整个表，失败则返回false
	function getAll($query_item) {
		$res = $this->query($query_item);		
		if($res){
			$return = array(); 
   			while($row=mysql_fetch_array($res)) {
       			$return[] = $row;
   			}
			return $return;	
		}else {
			return false;
		}
	}
		var $PageSize;	//每页记录数
		var $CurrentPageID;	//当前页码
		var $numPages;	//总页数 
		var $numItems; //总记录数 
		var $sql;
		
	function getPage($query_item,$GetPageSize,$GetCurrentPageID){
		$this->PageSize = $GetPageSize;
		$this->CurrentPageID = $GetCurrentPageID;
		$query_result = $this->query($query_item);
		$this->numItems = mysql_num_rows($query_result);
		
		if($this->numItems < $this->PageSize){
			$this->numPages = 1;
			}
			else if($this->numItems%$this->PageSize==0){
				$this->numPages = $this->numItems/$this->PageSize;
			}
			else{
				$this->numPages = intval($this->numItems/$this->PageSize) + 1;
			}
		if($this->CurrentPageID<=0){
			$this->CurrentPageID = 1;
		}else if($this->CurrentPageID>$this->numPages){
			$this->CurrentPageID = $this->numPages;
		}
		$query_item = $query_item . " limit ".($this->CurrentPageID - 1) * $this->PageSize.", ".$this->PageSize;
		
		return $this->getAll($query_item);
	}
}
?>