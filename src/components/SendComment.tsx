import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css';
import { RootState } from '../store';
import { Comments, Type } from '../types/Entites';
import { postComment } from '../utils/api';
export default function SendComment(props: { contentID: any, type: Type, handleData: (entity: any) => void }) {
    const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
    const [comment, setComment] = useState('');
    const saveButon = async () => {
        await postComment({ type: props.type, userID: userInfo.id, contentID: props.contentID, comment: comment, isSpoiler: false } as Comments).then((res) => {
            props.handleData(res.data.entity);
        });
        setComment('');
    }
    return (
        <div className={styles.commentsText}>
            <div className={styles.sendTextInputContainer + " " + styles.commentTextInput}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Yorum yazınız'></textarea>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 5 }}>
                    <div onClick={saveButon} className={styles.sendButon}>
                        <FontAwesomeIcon icon={faPaperPlane} color="#fff" />
                    </div>
                </div>
            </div>
        </div>
    )
}
