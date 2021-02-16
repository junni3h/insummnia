package com.insummnia.webpjt.admin.role.impl;

import java.util.ArrayList;
import java.util.List;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
import com.insummnia.webpjt.admin.role.entity.RoleTreeEntity;
import com.insummnia.webpjt.admin.role.entity.RoleUserEntity;
import com.insummnia.webpjt.common.entity.CommonResultEntity;
import com.insummnia.webpjt.user.entity.UserMSTEntity;
import com.insummnia.webpjt.user.impl.UserDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleMgmtServiceImpl implements RoleMgmtService {
    
    @Autowired
    RoleMgmtDAO roleMgmtDAO;

    @Autowired
    UserDAO userDAO;
    
    /**
     * 권한 트리 리스트 조회
     * @return
     * @throws Exception
     */
    public List<RoleTreeEntity> findRoleTree() throws Exception {
        List<RoleTreeEntity> rtnTree = new ArrayList<RoleTreeEntity>();
        rtnTree = roleMgmtDAO.findRoleTree();

        return rtnTree;
    }

    /**
     * 권한 아이디별 권한 조회
     * @param params 권한 아이디
     * @return
     * @throws Exception
     */
    public RoleEntity findRoleById(RoleEntity params) throws Exception {
        RoleEntity rtnRole = new RoleEntity();
        rtnRole = roleMgmtDAO.findRolebyId(params);

        return rtnRole;
    }

    /**
     * 권한 정보 수정
     * @param params 권한 아이디
     * @return 
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public CommonResultEntity updateRoleById(RoleEntity params) throws Exception {
        CommonResultEntity result = new CommonResultEntity();
        
        try {
            roleMgmtDAO.updateRoleById(params);
            result.setSuccess(true);
            result.setMessage("권한 정보 수정이 완료되었습니다!");
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("권한 정보 수정이 실패하였습니다!");
        }

        return result;
    }

    /**
     * 사용자 권한 추가 및 삭제
     * @param params
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public CommonResultEntity updateUserRole(RoleUserEntity params) throws Exception {
        CommonResultEntity result = new CommonResultEntity();

        try {
            if(params.getExpectUsers().size() != 0){
                for(UserMSTEntity user : params.getExpectUsers()){
                    roleMgmtDAO.removeUserRole(user);
                }
                result.setMessage("사용자 권한을 삭제 하였습니다!");
            }

            else if (params.getRoleUsers().size() != 0){
                for(UserMSTEntity user : params.getRoleUsers()) {
                    roleMgmtDAO.insertUserRole(user);
                }
                result.setMessage("사용자 권한을 추가 및 수정 하였습니다!");
            }

            result.setSuccess(true);
            
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("사용자 권한을 수정, 추가 및 삭제를 하지 못하였습니다!");
        }

        return result;
    }

}
